import React from 'react'
import { StyleProvider } from '@mattersupply/hallway-ui'

const App: React.FC = props => (
  <StyleProvider>
    <React.StrictMode>{props.children}</React.StrictMode>
  </StyleProvider>
)

export { App }
