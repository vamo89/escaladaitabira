import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
// import Slider from "@material-ui/core/Slider";

const RoutesTable = ({ data, pico }) => {
  const { edges: posts } = data.allMarkdownRemark;

  const numberToGrade = [
    "4",
    "4sup",
    "5",
    "5sup",
    "6",
    "6sup",
    "7a",
    "7b",
    "7c",
    "Projeto",
  ];
  const [grauFilter, setGrauFilter] = useState([0, numberToGrade.length]);
  const [setorFilter, setSetorFilter] = useState("");

  const gradeText = (value) => numberToGrade[value];

  const filteredPosts = posts
    .filter(({ node: post }) => !pico || post.frontmatter.pico === pico)
    .filter(
      ({ node: post }) =>
        grauFilter[0] <= numberToGrade.indexOf(post.frontmatter.grau) &&
        numberToGrade.indexOf(post.frontmatter.grau) <= grauFilter[1]
    )
    .filter(
      ({ node: post }) => !setorFilter || post.frontmatter.setor === setorFilter
    );

  return (
    <>
      {/* {!!pico && (
        <>
          Filtros: grau
          <Slider
            name="grauFilter"
            onChange={(_, newValue) => setGrauFilter(newValue)}
            value={grauFilter}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={gradeText}
            valueLabelFormat={gradeText}
            markLabel
            max={numberToGrade.length - 1}
            style={{ width: 100 }}
          />
          Setor
          <input
            type="text"
            name="setorFilter"
            onChange={(event) => setSetorFilter(event.target.value)}
          />
        </>
      )} */}
      <table className="is-multiline routes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th className="desktop-only">Data da Conquista</th>
            <th className="desktop-only">Grau</th>
            <th className="desktop-only">Setor</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            filteredPosts
              .slice(0, pico ? filteredPosts.length : 10)
              .map(({ node: post }) => (
                <tr key={post.id}>
                  <td>
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.nome}
                    </Link>
                  </td>
                  <td className="desktop-only">
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.dataConquista}
                    </span>
                  </td>
                  <td className="desktop-only">
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.grau}
                    </span>
                  </td>
                  <td className="desktop-only">
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.setor}
                    </span>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};

RoutesTable.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default ({ pico }) => (
  <StaticQuery
    query={graphql`
      query RoutesTableQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___dataConquista] }
          filter: { frontmatter: { templateKey: { eq: "route-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                nome
                templateKey
                dataConquista(formatString: "DD/MM/YYYY")
                grau
                altura
                setor
                pico
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <RoutesTable data={data} count={count} pico={pico} />
    )}
  />
);
