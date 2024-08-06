import axios from 'axios';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { keyframes, styled } from 'styled-components'
import { isUserState, userState } from './atom';
import useStore from './store';
import Character1 from './character1.png';
import Logo from './Logo.png';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const Googleprovider = new GoogleAuthProvider;
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const isUser = localStorage.getItem('login-complete');
  const token = localStorage.getItem('access');

  // const [userData, setUserData] = useRecoilState(userState);
  // const userData = useRecoilValue(userState);
  // const setUserData = useSetRecoilState(userState);
  // const isUser = useRecoilValue(isUserState);
  // const setIsUser = useSetRecoilState(isUserState);

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
      const response = await axios.post('https://sugarmon.store/user/login/',{
        "username":id,
        "password":password
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      )
      localStorage.setItem( 'access',response.data.access);
      setUser(response.data.access);
      navigate('/')
      
    } catch(error){
      console.log(error)
      console.log(token)
    }

  }

  const handleAppleAuth = () => {

  }

  

  const handleGoogleAuth = () => {
    signInWithPopup(auth, Googleprovider)
    .then(result => {
      // setUserData(result.user)
      localStorage.setItem("userData", JSON.stringify(result.user));
      // setIsUser(true);
      // console.log(result.user)
      setUser(result.user);
      
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    if(user){
      navigate('/')
    }
  
  
  },[user])

  // useEffect(() => {
  //   let arr = [...userData];
  //   setUserData(arr);
  // },[userData])


  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center",gap:"250px"}}>
      <CharacterImg src={Character1}></CharacterImg>
      <LoginBody>
        <LogoImg src={Logo}>
  
        </LogoImg>
        <GotoSignUp>
          <p style={{color:"grey"}}>아직 회원이 아니신가요?</p>
          <Link to="/signup" style={{textDecoration:"none", color:"#667BC6"}}>
            <p style={{marginTop:"-10px", fontSize:"15px"}}>회원가입 하기</p>
          </Link>
        </GotoSignUp>
        <LoginCont>
          <LoginInput placeholder='아이디' value={id} onChange={handleIdChange}></LoginInput>
          <LoginInput type='password' placeholder='비밀번호' value={password} onChange={handlePasswordChange}></LoginInput>
          <LoginButton onClick={handleSubmit} >로그인 하기</LoginButton>
        </LoginCont>
        <p style={{color:"lightgrey"}}>____________________________________</p>
        <SnsBody>
          {/* <SnsButton onClick={handleAppleAuth} >애플</SnsButton> */}
          <SnsButton onClick={handleGoogleAuth}>구글</SnsButton>
        </SnsBody>
      </LoginBody>
    </div>
  )
}

export default Login

const bounce = keyframes`
0% {
  top: 100px;
  animation-timing-function: ease-in;
}
50% {
  top: 120px;
  
  animation-timing-function: ease-out;
}
55% {
  top: 140px; 
  animation-timing-function: ease-in;
}
65% {
  top: 120px; 
  animation-timing-function: ease-out;
}
95% {
  top: 100px;
  animation-timing-function: ease-in;
}
100% {
  top: 100px;
  animation-timing-function: ease-in;
}
`

const CharacterImg = styled.img`
  width:250px;
  height:250px;
  position:relative;
  top:0;
  animation: ${bounce} 1s infinite;
`



const LoginBody = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

`

const LogoImg = styled.img`
  width:250px;
  height:100px;
  margin-top:100px;
  margin-bottom:20px;
  margin-left:-20px;
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