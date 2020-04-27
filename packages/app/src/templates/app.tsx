import React from 'react'
import { StyleProvider } from '@mattersupply/hallway-ui'

const App: React.FC = props => <StyleProvider>{props.children}</StyleProvider>

export { App }
