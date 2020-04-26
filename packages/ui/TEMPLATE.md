# UI

This UI package focuses on providing framework agnostic React components. It is opinionated in its approach and tools:

- [Emotion](https://emotion.sh/docs/introduction) and [Styled System](https://styled-system.com/) for basic components
- [Rebass](https://rebassjs.org/) for UI primitives (Button, Grid etc.)
- [Storybook](https://storybook.js.org/) for Component demos
- [Jest + React Testing Library](https://jestjs.io/docs/en/tutorial-react) for Unit Testing UI components
- [Typescript](https://www.typescriptlang.org/) as the preferred language

## Why...

### Emotion

Emotion is an extremely robust styling library for React components. CSS, SCSS etc. have massive drawbacks when it comes to understanding the context and driving styling closer to the actual component where it's used. Emotion allows us to either use Object based styling or almost native CSS to style components, depending on the project preference. It's also very performant and provides the basis for Rebass.

Styled-System is built on top of Emotion and provides a structured approach to using responsive values and themable values for our components, without having to clutter the codebase with media queries.

- Note: The use of SCSS and CSS is _strongly discouraged_.

### Rebass

Rebass is built on top of Emotion and provides a very compact UI primitives library that is a great starting point to create accessible and re-usable components inside of our projects.

- Note: Projects are _allowed to not use Rebass if they really prefer something else_.

### Storybook

To make sure that all of our components work independent of their context. If you're building components and you don't know how to make them work inside of Storybook, the dependencies of that component are likely to complex. It also provides a documentation on how to use the components and provides designers with an overview of what's available. Seriously, you may think this is too much work, but give it a try and you will see how much easier your development experience will be when creating custom components.

- Note: Storybook is _mandatory_ for large projects, strongly encouraged for smaller projects.

### Typescript

We've had many debates. At the end of the day, JavaScript is very flexible, but introduces bugs left and right, because documentation is often poor and things can change very quickly. With TypeScript, we get peace of mind at compile time, that at least we're using mostly the right types and check for `null` when applicable. Obviously, it can take a bit more time to get used to TypeScript and writing correct types, but in the long run, applications are more stable and better "documented" through types.

- Note: Typescript is _mandatory_ for large projects.
