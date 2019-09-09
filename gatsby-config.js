const path = require('path');

module.exports = {
  siteMetadata: {
    anything: 'I want',
    title: `Wes Bos`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `Wes Bos`,
  },
  plugins: [
    // Source the hot tips from the file system
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/tips`,
        name: 'tip',
      },
    },
    // Source the Images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    // Duplicate plugin declaration?!
    // THIS IS A BUG FIX
    // https://twitter.com/chrisbiscardi/status/1171139195257012224
    {
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 500,
        linkImagesToOriginal: false,
      },
    },
    // END BUG
    // I HOPE THIS IS TEMPORARY
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-react-helmet`,
  ],
};
