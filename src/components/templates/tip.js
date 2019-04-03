import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
// import { Link } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import Layout from '../Layout';
import tipStyles from '../styles/tip.module.scss';

export default function Tip({ data, pageContext }) {
  const tip = data.mdx;
  return (
    <Layout>
      <div className={tipStyles.tip}>
        <h2>{tip.frontmatter.title}</h2>
        <MDXRenderer>{tip.code.body}</MDXRenderer>

        {pageContext.prev && (
          <AniLink
            bg="#fff"
            direction="right"
            swipe
            to={`/tip/${pageContext.prev}`}
          >
            ← Prev Tip
          </AniLink>
        )}
        {pageContext.next && (
          <AniLink
            bg="#fff"
            direction="left"
            swipe
            to={`/tip/${pageContext.next}`}
          >
            Next Tip →
          </AniLink>
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
