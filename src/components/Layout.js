import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import Nav from './Nav';
import Footer from './Footer';
import 'normalize.css';
import './styles/global.css';
import LayoutStyles from './styles/LayoutStyles'

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
    <LayoutStyles>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta charSet="utf-8" />
      </Helmet>
      <h1>{data.site.siteMetadata.title}</h1>
      <Nav />
      {children}
      <Footer/>
    </LayoutStyles>
  );
}
