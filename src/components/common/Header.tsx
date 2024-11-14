import React from 'react'
import { styled } from 'styled-components'

const Header = () => {
  return (
    <HeaderStyled>
      <h1>Book Store</h1>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  background-color: ${({theme}) => theme.color.background};

  h1 {
    color: ${(props) => props.theme.color.primary}; // ; 이거 안찍으면 적용안됨 왜?
  }
`

export default Header
