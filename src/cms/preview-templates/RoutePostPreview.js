import React from 'react'
import PropTypes from 'prop-types'
import { RoutePostTemplate } from '../../templates/route-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const conquistadores = entry.getIn(['data', 'conquistadores'])
  return (
    <RoutePostTemplate
      grau={entry.getIn(['data', 'grau'])}
      descricao={entry.getIn(['data', 'descricao'])}
      conquistadores={conquistadores && conquistadores.toJS()}
      nome={entry.getIn(['data', 'nome'])}
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
