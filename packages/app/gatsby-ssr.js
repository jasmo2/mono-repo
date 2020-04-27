import React from 'react'
import { App } from 'src/templates/app'

// Wraps every page in a component
export const wrapPageElement = ({ element }) => <App>{element}</App>
