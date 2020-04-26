import React from 'react'
import { addDecorator } from '@storybook/react'
import StyleProvider from '../src/styles/StyleProvider'

addDecorator(storyFn => <StyleProvider>{storyFn()}</StyleProvider>)
