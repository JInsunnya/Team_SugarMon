import axios from 'axios';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components'
import { isUserState, userState } from './atom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const Googleprovider = new GoogleAuthProvider
  // const AppleProvider = new Apple
  const navigate = useNavigate();
  // const [userData, setUserData] = useRecoilState(userState);
  const userData = useRecoilValue(userState);
  const setUserData = useSetRecoilState(userState);
  const isUser = useRecoilValue(isUserState);
  const setIsUser = useSetRecoilState(isUserState);

  const handleIdChange = (event) => {
    console.log(event.target.value);
    setId(event.target.value)
  }

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value)
  }

  async function handleSubmit(){
    try{
      const response = await axios.post(``,{
        username:id,
        password:password
      })
      console.log(userData)
    } catch(error){
      console.log(error)
    }

  }

  const handleAppleAuth = () => {

  }

  const handleGoogleAuth = () => {
    signInWithPopup(auth, Googleprovider)
    .then(result => {
      setUserData(result.user)
      localStorage.setItem("userData", JSON.stringify(result.user))
      setIsUser(true);
      // console.log(result.user)
    })
    .catch(error => console.log(error))
  }

  // useEffect(() => {
  //   if(userData){
  //     navigate('/')
  //   }
  
  
  // },[])

  // useEffect(() => {
  //   let arr = [...userData];
  //   setUserData(arr);
  // },[userData])


  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center",gap:"250px"}}>
      <CharacterImg>CharacterImg</CharacterImg>
      <LoginBody>
        <LogoImg>
          Logo  
        </LogoImg>
        <GotoSignUp>
          <p style={{color:"grey"}}>아직 회원이 아니신가요?</p>
          <Link to="/signup" style={{textDecoration:"none", color:"#667BC6"}}>
            <p style={{marginTop:"-10px", fontSize:"15px"}}>회원가입 하기</p>
          </Link>
        </GotoSignUp>
        <LoginCont>
          <LoginInput placeholder='아이디' value={id} onChange={handleIdChange}></LoginInput>
          <LoginInput placeholder='비밀번호' value={password} onChange={handlePasswordChange}></LoginInput>
          <LoginButton>로그인 하기</LoginButton>
        </LoginCont>
        <p style={{color:"lightgrey"}}>____________________________________</p>
        <SnsBody>
          <SnsButton onClick={handleAppleAuth} >애플</SnsButton>
          <SnsButton onClick={handleGoogleAuth}>구글</SnsButton>
        </SnsBody>
      </LoginBody>
    </div>
  )
}

export default Login

const CharacterImg = styled.image`

`

const LoginBody = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

`

const LogoImg = styled.image`
  font-size:35px;
  margin-bottom: 30px;
  margin-top:150px;
`

const GotoSignUp = styled.div`
  text-align:center;
  margin-top:-20px;
  margin-bottom:25px;
`

const LoginCont = styled.div`
  display:flex;
  flex-direction:column;
  gap: 20px;
`

const LoginInput = styled.input`
  border:1px solid lightgrey;
  width: 300px;
  height:45px;
  border-radius:10px;
  padding-left: 10px;
  box-sizing: border-box;

  &:focus{
    outline:none;
  }
`

const LoginButton = styled.button`
  width:300px;
  height:45px;
  border:none;
  border-radius:10px;
  background-color:rgba(218, 114, 151.8);
`

const SnsBody = styled.div`
  display:flex;
  gap:25px;
`

const SnsButton = styled.button`
  border-radius:50%;
  width:50px;
  height:50px;
  border:none;
`