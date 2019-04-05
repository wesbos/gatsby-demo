const path = require('path');
const axios = require('axios');

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
  tips.forEach((tip, i) => {
    actions.createPage({
      // What is the URL?
      path: `tip/${tip.frontmatter.slug}`,
      // What react component should we use to render this page?
      component: tipTemplate,
      // What data should be surfaced to the Component or Query on this page?
      context: {
        id: tip.id,
        prev: tips[i - 1] ? tips[i - 1].frontmatter.slug : null,
        next: tips[i + 1] ? tips[i + 1].frontmatter.slug : null,
      },
    });
  });
}

async function sourceUsers({ actions, createNodeId, createContentDigest }) {
  // 1. Fetch the users
  const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
  // 2. Loop over Each user
  users.forEach(user => {
    // 3. Create an object for the user
    const node = {
      // Data for the node
      ...user, // take everything from the user,
      // Custom data fields
      // custom ID
      id: createNodeId(`user-${user.id}`),
      parent: null, // there is no parent
      children: [], // no children
      internal: {
        type: `User`, // What should we call it?
        mediaType: 'application/json',
        contentDigest: createContentDigest(user), // helps gatsby know when a node changed
      }
    }
    actions.createNode(node);
  });
}

exports.createPages = async function({ graphql, actions }) {
  await turnMDXIntoPages({ graphql, actions });
};


exports.sourceNodes = async function({ actions, createNodeId, createContentDigest }) {
  await sourceUsers({actions, createNodeId, createContentDigest});
}

