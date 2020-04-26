import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { NavBar } from '../../index'

test('Renders', async () => {
  const { getByRole } = render(
    <NavBar>
      <div role="heading">My First Component</div>
    </NavBar>
  )
  expect(getByRole('heading')).toHaveTextContent('My First Component')
})
