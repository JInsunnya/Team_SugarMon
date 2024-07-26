import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { styled } from 'styled-components'
import { isUserState, userState } from './atom'

const Nav = () => {
  const userData = useRecoilValue(userState);
  const setUserData = useSetRecoilState(userState);
  const isUser = useRecoilValue(isUserState);
  const setIsUser = useSetRecoilState(isUserState);

  const handleLogOut = () => {
    localStorage.removeItem('userData');
    setUserData([]);
    setIsUser(false);
    console.log(isUser);
  }
  
  return (
    <div>
      <NavBody>
        <Category>
          <NavEl href='javascript:void(0)'>Home</NavEl>
          <NavEl href='javascript:void(0)'>GI</NavEl>
        </Category>
        <div>
          {!isUser ? <button onClick={handleLogOut}>로그아웃</button> : <></>}
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
  background: rgba(102, 123, 198, .5);
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