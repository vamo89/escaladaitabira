import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import RoutesTable from "../components/RoutesTable";

export const IndexPageTemplate = ({
  image,
  heading,
  subheading,
  title,
  description,
  intro,
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "150px",
          lineHeight: "1",
          justifyContent: "space-around",
          alignItems: "left",
          flexDirection: "column",
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
            backgroundColor: "rgb(255, 68, 0)",
            color: "white",
            lineHeight: "1",
            padding: "0.25em",
          }}
        >
          {heading}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
            backgroundColor: "rgb(255, 68, 0)",
            color: "white",
            lineHeight: "1",
            padding: "0.25em",
          }}
        >
          {subheading}
        </h3>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {title}
                    </h3>
                    <p class="is-size-4">{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Últimas vias
                  </h3>
                  <RoutesTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  subheading: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        title={frontmatter.title}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        title
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
            link
          }
        }
      }
    }
  }
`;
