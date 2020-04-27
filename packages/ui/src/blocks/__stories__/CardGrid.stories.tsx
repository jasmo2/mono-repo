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
  { assets: [require('~ui/static/andres.png')], key: 'b' },
  { assets: [require('~ui/static/andres.png')], key: 'b' },
  { assets: [require('~ui/static/andres.png')], key: 'b' },
  { assets: [require('~ui/static/andres.png')], key: 'b' },
  { assets: [require('~ui/static/andres.png')], key: 'b' },
  { assets: [require('~ui/static/andres.png')], key: 'b' },
  { assets: [require('~ui/static/andres.png')], key: 'b' },
  { assets: [require('~ui/static/andres.png')], key: 'b' },

  { assets: [require('~ui/static/andres.png')], key: 'b' },
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
