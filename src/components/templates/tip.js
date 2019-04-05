import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../Layout';
import tipStyles from '../styles/tip.module.scss';

export default function Tip({ data, pageContext }) {
  const tip = data.mdx;
  return (
    <Layout>
      <Helmet>
        <title>{tip.frontmatter.title}</title>
      </Helmet>
      <div className={tipStyles.tip}>
        <h2>{tip.frontmatter.title}</h2>
        <MDXRenderer>{tip.code.body}</MDXRenderer>

        {pageContext.prev && (
          <Link
            bg="#fff"
            direction="right"
            swipe
            to={`/tip/${pageContext.prev}`}
          >
            ← Prev Tip
          </Link>
        )}
        {pageContext.next && (
          <Link
            bg="#fff"
            direction="left"
            swipe
            to={`/tip/${pageContext.next}`}
          >
            Next Tip →
          </Link>
        )}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
        scope
      }
      frontmatter {
        slug
        title
      }
    }
  }
`;
