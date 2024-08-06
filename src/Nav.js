import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { styled } from 'styled-components'
import { isUserState, userState } from './atom'
import useStore from './store'

const Nav = () => {
  // const userData = useRecoilValue(userState);
  // const setUserData = useSetRecoilState(userState);
  // const isUser = useRecoilValue(isUserState);
  // const setIsUser = useSetRecoilState(isUserState);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const isUser = localStorage.getItem('login-complete');

  const handleLogOut = () => {
    localStorage.removeItem('userData');
    // setUserData([]);
    // setIsUser(false);
    setUser(false);
    localStorage.removeItem('access')
    sessionStorage.removeItem('access')
    // console.log(isUser);
  }

  useEffect(() => {

  }, )
  
  return (
    <div>
      <NavBody>
        <Category>
          <NavEl href='/home'>Home</NavEl>
          <NavEl href='/gi'>GI</NavEl>
        </Category>
        <div>
          {user? <LogoutButton onClick={handleLogOut}>LogOut</LogoutButton> : <></>}
          <MyPage href='/mypage'>
            MyPage
          </MyPage>
        </div>
      </NavBody>
    </div>
  )
}

export default Nav

const NavBody = styled.div`
  // background: rgba(218, 114, 151, .6);
  background:#91DDCF;
  display:flex;
  height: 45px;
  justfiy-content:center;
  align-items:center;
  // position:fixed;

`

const Category = styled.div`
  display:flex;
  gap: 30px;
  flex-grow:1;
`

const NavEl = styled.a`
  color: white;
  font-weight: 800;
  text-decoration:none;
  margin-left: 30px;
`

const MyPage = styled.a`
  color: white;
  font-weight: 800;
  text-decoration:none;
  margin-right: 30px;
`

const LogoutButton = styled.button`
  border:none;
  margin-right:20px;
  border-radius:20px;
  background:none;
  font-size:16px;
  color: white;
  font-weight: 900;
`