import React from 'react'
import { css, Global } from '@emotion/core'

// Helvetica Now Display
const helveticaNowDisplay = [
  {
    fontFamily: 'Helvetica Now Display',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: `url(${require('~ui/assets/fonts/HelveticaNowDisplay.otf')})
      format('otf')`,
  },
  {
    fontFamily: 'Helvetica Now Display',
    fontStyle: 'normal',
    fontWeight: 'bold',
    src: `url(${require('~ui/assets/fonts/HelveticaNowDisplayMedium.otf')})
      format('otf')`,
  },
]

// Helvetica Now Text
const helveticaNowText = [
  {
    fontFamily: 'Helvetica Now Text',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: `url(${require('~ui/assets/fonts/HelveticaNowText.otf')})
      format('otf')`,
  },
  {
    fontFamily: 'Helvetica Now Text',
    fontStyle: 'normal',
    fontWeight: 500,
    src: `url(${require('~ui/assets/fonts/HelveticaNowTextMedium.otf')})
      format('otf')`,
  },
]

const fontFaces = [
  ...helveticaNowDisplay,
  ...helveticaNowText,
  // {
  //   fontFamily: 'Patrick Hand SC',
  //   fontStyle: 'normal',
  //   fontWeight: 400,
  //   src: `local('Patrick Hand SC'),
  //     local('PatrickHandSC-Regular'),
  //     url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
  //       format('woff2')`,
  //   unicodeRange: `U+0100-024f, U+1-1eff,
  //     U+20a0-20ab, U+20ad-20cf, U+2c60-2c7f,
  //     U+A720-A7FF`,
  // },
]

// Create style wrapper from object styles above.
const style = css(
  fontFaces
    .map(fontFace => (css as any)({ '@font-face': fontFace }).styles)
    .join('\n')
)

const TypographyStyles: React.FC = props => <Global styles={style} {...props} />

export { TypographyStyles, style }
