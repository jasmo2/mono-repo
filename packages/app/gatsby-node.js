require(`ts-node`).register({ files: true })
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  })
}
