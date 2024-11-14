import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

interface layoutProps {
    children: React.ReactNode
}

const Layout = ({children}: layoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
