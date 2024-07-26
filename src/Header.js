import React from 'react'
import Nav from './Nav'
import { styled } from 'styled-components'

const Header = () => {
  return (
    <div>
      <HeaderBody>
        <LogoImg></LogoImg>
      </HeaderBody>
      <Nav></Nav>
    </div>
  )
}

export default Header

const HeaderBody = styled.div`
  background: rgba(255, 180, 194, 0);
  height: 100px;
  // position:fixed;
  // top:0;

`

const LogoImg = styled.img`


`