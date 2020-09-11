import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const RoutePostTemplate = ({
  grau,
  conquistadores,
  setor,
  descricao,
  nome,
  altura,
  dataConquista,
  protecoes,
  helmet,
}) => <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {nome}
            </h1>
            <p>Grau: {grau}</p>
            <p>Conquistadores: {conquistadores}</p>
            <p>Setor: {setor}</p>
            <p>Altura: {altura}</p>
            <p>Data da conquista: {dataConquista}</p>
            <p>Proteções: {protecoes}</p>
            <p>{descricao}</p>
          </div>
        </div>
      </div>
    </section>

RoutePostTemplate.propTypes = {
  grau: PropTypes.string,
  conquistadores: PropTypes.string,
  setor: PropTypes.string,
  descricao: PropTypes.string,
  nome: PropTypes.string.isRequired,
  altura: PropTypes.string,
  dataConquista: PropTypes.string,
  protecoes: PropTypes.string,
  helmet: PropTypes.object,
}

const RoutePost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <RoutePostTemplate
        grau={post.frontmatter.grau}
        conquistadores={post.frontmatter.conquistadores}
        setor={post.frontmatter.setor}
        descricao={post.frontmatter.descricao}
        nome={post.frontmatter.nome}
        altura={post.frontmatter.altura}
        dataConquista={post.frontmatter.dataConquista}
        protecoes={post.frontmatter.protecoes}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.nome}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.descricao}`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

RoutePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default RoutePost

export const pageQuery = graphql`
  query RoutePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        dataConquista(formatString: "DD/MM/YY")
        nome
        descricao
        grau
        protecoes
        setor
        conquistadores
        altura
      }
    }
  }
`
