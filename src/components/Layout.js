import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import Nav from './Nav';
import 'normalize.css';
import './styles/global.css';

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <div>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta charSet="utf-8" />
      </Helmet>
      <Nav />
      <h1>{data.site.siteMetadata.title}</h1>
      {children}
    </div>
  );
}
