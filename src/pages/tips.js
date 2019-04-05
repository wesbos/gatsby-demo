import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import TipsList from '../components/styles/TipsListStyles';

export default function TipsPage({ data }) {
  const tips = data.allMdx.nodes;
  return (
    <Layout>
      <h2>Tips!</h2>
      <TipsList>
        {tips.map(tip => (
          <li key={tip.id}>
            <Link to={`/tip/${tip.frontmatter.slug}`}>
              {tip.frontmatter.title}
            </Link>
          </li>
        ))}
      </TipsList>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx {
      nodes {
        id
        code {
          body
        }
        frontmatter {
          slug
          title
        }
      }
    }
  }
`;
