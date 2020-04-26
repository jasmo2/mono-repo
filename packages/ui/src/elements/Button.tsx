import React from 'react'
import { Button as RebassButton, ButtonProps } from 'rebass'

const Button: React.FC<ButtonProps> = props => (
  <RebassButton {...(props as any)} /> // This makes no sense.
)

export default Button
