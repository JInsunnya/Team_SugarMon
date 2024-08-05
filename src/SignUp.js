import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import Logo from './Logo.png'
import useStore from './store';
import character from './character2.png'

const SignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickName, setNickName] = useState('');
  const [isDoctor, setIsDoctor] = useState(true);
  const [email, setEmail] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleIdChange = (event) => {
    console.log(event.target.value)
    setId(event.target.value);
  }
  const handlePasswordChange = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value);
  }
  const handlePassword2Change = (event) => {
    console.log(event.target.value)
    setPassword2(event.target.value);
  }
  const handleNickNameChange = (event) => {
    console.log(event.target.value)
    setNickName(event.target.value);
  }

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  async function handleSubmit(){
    try{
      const response = await axios.post(`http://3.37.188.30:8000/user/register/`,
      {
        username: id,
        password1: password,
        password2: password2,
        email:email,
        nickname: nickName,
        isDoctor:false
      })
      console.log(response.data);
      localStorage.setItem("access",response.data.access);
      setIsComplete(true);
      
    } catch(error){
      console.log(error)
    }

  }

  function handleClick(){
    setIsDoctor(false);
  }

  return (
    <>
    {isComplete ?
      <div style={{width:'1000px', margin:'auto', textAlign:'center', marginTop:'200px'}}>
        <CharImg src={character}></CharImg>
        <p style={{fontSize:"30px"}}>회원가입을 성공했습니다🥳</p>
        <Link to={'/'}>홈으로 돌아가기</Link>
      </div>
    : <div>
      <SignUpBody>
        <LogoImg src={Logo}></LogoImg>
        <GotoLogin>
          <p style={{color:"grey"}}>이미 회원이신가요?</p>
          <Link to='/login' style={{textDecoration:"none"}}>
            <p style={{marginTop:"-10px", color:"#667BC6", textDecoration:'none', color:'white'}}>로그인하기</p>
          </Link>
        </GotoLogin>
        {isDoctor ?
        <div style={{display:'flex', flexDirection:"column", gap:"30px"}}>
          <Link to='/doctorsignup'>
            <UserButton style={{backgroundColor:"#DA7297", color:'white'}}>의사 유저로 가입하기</UserButton>
          </Link>
          <UserButton onClick={handleClick}>일반 유저로 가입하기</UserButton>
        </div>
        :
        <SignUpCont>
          <SignUpInput placeholder='아이디' value={id} onChange={handleIdChange}></SignUpInput>
          <SignUpInput type='password' placeholder='비밀번호' value={password} onChange={handlePasswordChange}></SignUpInput>
          <SignUpInput type='password' placeholder='비밀번호 확인' value={password2} onChange={handlePassword2Change}></SignUpInput>
          <SignUpInput placeholder='이메일' value={email} onChange={handleEmailChange}></SignUpInput>
          <SignUpInput placeholder='닉네임' value={nickName} onChange={handleNickNameChange}></SignUpInput>
          <SignUpButton onClick={handleSubmit}>가입하기</SignUpButton>
        </SignUpCont>
        }
      </SignUpBody>
    </div>
    }
    </>
  )
}

export default SignUp

const CharImg = styled.img`
  width:100px;
  height:100px;
`

const SignUpBody = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  margin-top: 70px;
`

const LogoImg = styled.img`
  width:400px;
  height:150px;
  margin-bottom:5px;
  margin-top:-20px;
  margin-left:-25px;
`

const SignUpCont = styled.div`
  display:flex;
  flex-direction:column;
  gap:25px;
`

const SignUpInput = styled.input`
  width: 350px;
  height: 55px;
  border-radius: 10px;
  border:1px solid lightgrey;
  padding-left:20px;

  &:focus{
    outline:none;
  }

`

const SignUpButton = styled.button`
  border:none;
  border-radius:10px;
  height: 55px;
  background: rgba(218, 114, 151, .8);
  color:white;
  font-weight:800;
  font-size: 16px;
`

const GotoLogin = styled.div`
  margin-bottom: 20px;
  margin-top:-25px;
`

const AnotherWay = styled.div`

`

const UserButton = styled.button`
  width:350px;
  height:60px;
  border:none;
  border-radius: 10px;
  font-size:17px;
  font-weight:700;

  &:focus{
    outline:none;
  }

`