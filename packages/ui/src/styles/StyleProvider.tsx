import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'

import { theme } from '~ui/styles/theme'
import { GlobalStyles } from '~ui/styles/global'
import { TypographyStyles } from '~ui/styles/typography'

const StyleProvider: React.FC = props => {
  return (
    <ThemeProvider theme={theme}>
      <TypographyStyles />
      <GlobalStyles />
      {props.children}
    </ThemeProvider>
  )
}

export default StyleProvider
