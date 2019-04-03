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

exports.createPages = async function({ graphql, actions }) {
  await turnMDXIntoPages({ graphql, actions });
};


// exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
//   const { createNode } = actions
//   var fs = require('fs');

//   const tweets = require('./src/tweets.js').reverse().slice(0, 20);


//   tweets.forEach(function (tweet, i) {

//     if (tweet.entities.media.length) {
//       const filename = tweet.entities.media[0].media_url.split('/').pop().replace(' ','');
//       // move the photo over
//       fs.createReadStream(`../../../../../Downloads/815246_fed6dd08eac39871ab83b7657c3acf873464607b/${tweet.entities.media[0].media_url}`).pipe(fs.createWriteStream(`./src/images/tweets/${filename}`));

// const mdx = `---
// title: ${tweet.text.split('\n').pop()}
// slug: ${tweet.text.replace('🔥','').toLowerCase().trim().split(' ').slice(0,3).join('-')}
// type: tip
// ---

// ![](../images/tweets/${filename})

// ${tweet.text}
// `;

//     fs.writeFileSync(`./src/tips/hot-tip-${i + 1}.mdx`, mdx);
//     }


//       const node = {
//         ...tweet,
//       id: createNodeId(`tweet-${tweet.id}`),
//       parent: null,
//       children: [],
//       internal: {
//         type: `Tweet`,
//         mediaType: `text/json`,
//         content: JSON.stringify(tweet),
//         contentDigest: createContentDigest(tweet)
//       }
//     }
//     createNode(node)
//   });


// };

