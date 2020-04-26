module.exports = {
  target: 'serverless',
  distDir: '.next',
  exportPathMap: async function() {
    // pages we know about beforehand
    const paths = {
      '/': { page: '/' },
    }
    // dynamic, data-generated pages
    // const content = await jdown('content') // assumes some markdown files in a `/content` folder, with frontmatter that offers a slug
    // const posts = [] // build up array of objects for the top level list
    // Object.entries(content).forEach(([filename, fileContent]) => {
    //   // the filename becomes the slug
    //   paths[`/blog/${filename}`] = { page: '/blog/[slug]', query: {
    //       slug: filename,
    //       ...fileContent
    //     }
    //   }
    // })
    return paths
  },
}
