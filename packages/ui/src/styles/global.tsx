import React from 'react'
import { Global, css } from '@emotion/core'
import { ThemeType } from '~ui/styles/theme'

const style = (theme: ThemeType) => css`
  a,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  *,
  a:visited,
  a:active {
    text-decoration: none;
  }

  *,
  *:focus {
    outline: none;
  }

  html {
    box-sizing: border-box;
    background-color: ${theme.colors.white};
  }

  html,
  body {
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-family: ${theme.fonts.body};
    font-weight: normal;
    font-size: 10px;
    color: ${theme.colors.black};

    padding: 0;
    margin: 0;
    min-height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.fonts.heading};
  }
`

const GlobalStyles: React.FC = props => <Global styles={style} {...props} />

export { GlobalStyles, style }
