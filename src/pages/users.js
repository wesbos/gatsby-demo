import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export default function TipsPage({ data }) {
  return (
    <Layout>
      <h2>Users!</h2>
      <ul>
        {data.allUser.nodes.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query {
    allUser {
      nodes {
        name
        phone
      }
    }
  }
`;
