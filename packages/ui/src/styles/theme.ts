import facepaint from 'facepaint'
import emotionStyled, { CreateStyled } from '@emotion/styled'

const colors = {
  black: '#000',
  white: '#fff',
  red: '#f00',
  silver: '#ccc',
  error: '#8b0000',
  errorTranslucent: 'rgb(139,0,0, 0.4)',
  supernova: '#ffce03',
}

const breakpoints = ['37.5em', '64em', '80em', '120em']
const mediaQueries = {
  small: `@media screen and (min-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[1]})`,
  large: `@media screen and (min-width: ${breakpoints[2]})`,
  xlarge: `@media screen and (min-width: ${breakpoints[3]})`,
}

const space: any = [0, 4, 8, 16, 32]
space.small = space[1]
space.medium = space[2]
space.large = space[3]

const fontSizes: any = [
  8,
  10,
  13,
  16,
  20,
  25,
  31,
  39,
  48,
  61,
  76,
  95,
  119,
  149,
  186,
  232,
]

const fonts = {
  heading: 'Helvetica Now Display',
  body: 'Helvetica Now Text',
}

const buttons = {
  primary: {
    color: 'black',
    border: '1px solid black',
  },
}

export type ThemeType = typeof theme
export const theme = {
  breakpoints,
  mediaQueries,
  colors,
  fonts,
  fontSizes,
  space,
  buttons,
}

export const mq = facepaint(
  breakpoints.map(bp => `@media screen and (min-width: ${bp})`)
)

export const styled = emotionStyled as CreateStyled<ThemeType>
