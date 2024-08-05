import React from 'react'
import Nav from './Nav'
import { styled } from 'styled-components'
import Logo from './Logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    // <div style={{position:"fixed", zIndex:'100'}}>
    <div>
      <HeaderBody>
        <Link to="/">
          <LogoImg src={Logo}></LogoImg>
        </Link>
      </HeaderBody>
      <Nav></Nav>
    </div>
  )
}

export default Header

const HeaderBody = styled.div`
  // background: rgba(255, 180, 194, 0);
  height: 120px;
  // position:fixed;
  // top:0;
  width:1450px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:white;
`

const LogoImg = styled.img`
height:120px;
width:350px;

`