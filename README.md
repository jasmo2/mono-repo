# Matter Supply Co — Static Site Starter

## How does this work?

Static sites are built using Monorepos by leveraging [Lerna](https://github.com/lerna/lerna) and [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). In a nutshell, we use Lerna to version packages, we use Yarn Workspaces to manage dependencies.

The idea is that we separate distinc parts of the project into separate packages. For example, the UI elements are separate from the Website, are different from the Services, are different from the Gateway that uses the services. You can have multiple UI packages, for example if you have an Admin UI or a distinct Shop UI. The idea is to keep the API footprint smaller and have clearer dependency paths.

_An example layout might be:_

- `packages/ui` for the main UI blocks + elements
- `packages/web` for the Gatsby / Next application using the UI package
- `packages/services` for the Graph Matter services
- `packages/gateway` for the Graph Matter gateway

## Why?

By making sure that UI components know nothing about the framework they're used in, we keep dependencies clear. There is no way for a UI component to access data directly from the framework, thus making sure we create maintainable, testable code across the board and keep the application code to contain the application logic, while the UI components encapsulate general business logic, because they're more generic.

# Setup

### 1. Project Naming

Rename your package names. In your individual `package.json`, rename the packages to `@[project-name]/ui` etc. Also, do yourself a favor and start out with v0.0.1, makes it easier during development.

### 2. Matter Config

In your `matter.yml`, rename `my-project` to `[project-name]`

### 3. Setup NPM / Yarn

Go to your [Github Personal Access Tokens](https://github.com/settings/tokens) and create a token to access packages (write:packages, read:packages). Make sure to have that token exported as $GITHUB_PACKAGES_TOKEN in your `~/.profile` or `~/.zshrc` or whatever you use (wherever you set your $PATH).

- Note: `echo $GITHUB_PACKAGES_TOKEN` in your terminal should echo a token.

### 4. Install Dependencies

In your root folder, run `yarn` to install the basic dependencies.

- Note: `yarn test-ui` in your terminal should now work and show you a coverage report.

### 5. Add Packages

This template doesn't ship with many packages, it's deliberately separate from the individual packages.

- For your web project, create either a _Gatsby_ or _Next.js_ project from the existing templates or from scratch.
- For services, create either `packages/functions` if you're using Netlify functions, or create a Graph Matter environment from another template.

# UI

See [packages/ui README](packages/ui/README.md)

# Conventions

### 1. Document font-size

Document `font-size` is `10px`. That means that `1rem` === `10px`.

- The recommendation is to use `px` for the document root, `rem` for the Module, `em` for the Element + Block. At the very least, _DO NOT USE_ `px` in modules and elements.

### 2. Create script shortcuts in your root packages.json

- Scripts in subpackages should be accessible from the root. An easy trick is to use `yarn --cwd packages/X run Y` (runs Y in package X). Use the `{action}:{package}` format when naming your actions. Like `test:ui` to test the UI package. Why? So that you can also add `npm-run-all` scripts and just run `develop:*` to run all develop scripts in parallel.

# Workflows

Under `.github/workflows` you will find an example workflow to build the Storybook for the UI package. This will push your Storybook to a separate branch, `storybook-master`, whenever you push to `master`. You can add a lot more here, but this serves as a working example (for example, add one that pushes to `storybook-develop` when you push to the `develop` branch).

You'll also find a `netlify.toml` (Netlify is the preferred hosting service) in order to push Storybook to its separate domain.

# Testing

... Sebas, Christian and Chiquito to help out.

- Percy.io for visual testing
- Cypress for functional testing
- Jest for unit testing
