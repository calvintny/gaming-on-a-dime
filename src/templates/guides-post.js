import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const GuidesPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section w-full">
      {helmet || ''}
      <div className="container my-0 mx-auto lg:px-60 m:px-40 px-7 mt-10">
          <h1 className="text-post-title font-bold leading-post-title font-oswald text-primary no-underline">
            {title}
          </h1>
          <p className="font-open text-content my-5">{description}</p>
          <div className="post-content mb-1">
            <PostContent content={content} />
          </div>
          {tags && tags.length ? (
            <div>
              <h4 className="text-content font-open text-sm">Tags</h4>
              <ul className="taglist font-open text-xs">
                {tags.map((tag) => (
                  <li key={tag + `tag`} className="my-5">
                    <Link className="bg-yellow-400 p-1.5 list-none float-left rounded-2xl mr-1" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
      </div>
    </section>
  )
}

GuidesPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const GuidesPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <GuidesPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Guides">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

GuidesPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default GuidesPost

export const pageQuery = graphql`
  query GuidesPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
