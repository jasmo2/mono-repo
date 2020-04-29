import * as React from 'react'
import CardGrid from '../CardGrid'
import Card from '../Card'

export default { title: 'CardGrid' }

const data = [
  {
    assets: [
      require('~ui/static/andres.png'),
      require('~ui/static/andres.png'),
      require('~ui/static/andres.png'),
      require('~ui/static/andres.png'),
      require('~ui/static/andres.png'),
    ],
    key: 'c',
  },
  {
    assets: [
      require('~ui/static/andres.png'),
      require('~ui/static/andres.png'),
      require('~ui/static/andres.png'),
      require('~ui/static/andres.png'),
    ],
    key: 'a',
  },
  { assets: [require('~ui/static/andres.png')], key: 'b' },
  { assets: [require('~ui/static/andres.png')], key: 'd' },
  { assets: [require('~ui/static/andres.png')], key: 'e' },
  { assets: [require('~ui/static/andres.png')], key: 'f' },
  { assets: [require('~ui/static/andres.png')], key: 'g' },
  { assets: [require('~ui/static/andres.png')], key: 'h' },
  { assets: [require('~ui/static/andres.png')], key: 'i' },
  { assets: [require('~ui/static/andres.png')], key: 'j' },
  { assets: [require('~ui/static/andres.png')], key: 'k' },

  { assets: [require('~ui/static/andres.png')], key: 'l' },
]

export const basic = () => (
  <CardGrid
    data={data}
    renderCard={data => (
      <Card px={2} py={2} assets={data.assets}>
        Hi
      </Card>
    )}
  ></CardGrid>
)
