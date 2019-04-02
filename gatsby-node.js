const path = require('path');

async function turnMDXIntoPages({ graphql, actions }) {
  const tipTemplate = path.resolve('./src/components/templates/tip.js');
  const { data } = await graphql(`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "tip" } } }) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  // Loop over the tips
  const tips = data.allMdx.nodes;
  tips.forEach(tip => {
    actions.createPage({
      // What is the URL?
      path: `tip/${tip.frontmatter.slug}`,
      // What react component should we use to render this page?
      component: tipTemplate,
      // What data should be surfaced to the Component or Query on this page?
      context: {
        id: tip.id,
      },
    });
  });
}

exports.createPages = async function({ graphql, actions }) {
  await turnMDXIntoPages({ graphql, actions });
};
