import React from 'react'

interface NavBarProps {
  message?: string
}

const NavBar: React.FC<NavBarProps> = ({
  children,
  message = 'Yea!',
  ...props
}) => {
  return (
    <div {...props}>
      <h1>{message}</h1> {children}
    </div>
  )
}

export default NavBar
