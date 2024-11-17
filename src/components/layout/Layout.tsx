import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import styled from 'styled-components'

interface layoutProps {
    children: React.ReactNode
}

const Layout = ({children}: layoutProps) => {
  return (
      <>
        <Header />
        <LayoutStyle>{children}</LayoutStyle>
        <Footer />
      </>
  )
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto; // 가운데 정렬
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;
`;

export default Layout
