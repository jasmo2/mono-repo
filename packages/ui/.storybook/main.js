const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const SRC_PATH = path.join(__dirname, '../src')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // do mutation to the config
    config.resolve['plugins'] = [new TsconfigPathsPlugin({})]
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [SRC_PATH],
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: './tsconfig.json',
          },
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')

    return config
  },
}
