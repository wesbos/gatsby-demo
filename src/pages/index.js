import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Img from '../components/Img';

export default function HomePage({ data }) {
  return (
    <Layout>
      <p>I'm the home page!</p>
      <p>{data.description}</p>
      <Img src="dog.jpg" alt="Cute Pup" />
    </Layout>
  );
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
  }
`;
