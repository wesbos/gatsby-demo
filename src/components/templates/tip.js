import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import tipStyles from '../styles/tip.module.scss';

export default function Tip({ data }) {
  const tip = data.mdx;
  return (
    <div className={tipStyles.tip}>
      <h2>{tip.frontmatter.title}</h2>
      <MDXRenderer>{tip.code.body}</MDXRenderer>
    </div>
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
