import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const SignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickName, setNickName] = useState('');
  const [isDoctor, setIsDoctor] = useState(true);

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

  async function handleSubmit(){
    try{
      const response = await axios.post(``,
      {
        username: id,
        password1: password,
        password2: password2,
        nickname: nickName
      })
      
    } catch(error){
      console.log(error)
    }

  }

  function handleClick(){
    setIsDoctor(false);
  }

  return (
    <div>
      <SignUpBody>
        <LogoImg>Logo</LogoImg>
        <GotoLogin>
          <p style={{color:"grey"}}>이미 회원이신가요?</p>
          <Link to='/login' style={{textDecoration:"none"}}>
            <p style={{marginTop:"-10px", color:"#667BC6"}}>로그인하기</p>
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
          <SignUpInput placeholder='비밀번호' value={password} onChange={handlePasswordChange}></SignUpInput>
          <SignUpInput placeholder='비밀번호 확인' value={password2} onChange={handlePassword2Change}></SignUpInput>
          <SignUpInput placeholder='닉네임' value={nickName} onChange={handleNickNameChange}></SignUpInput>
          <SignUpButton onClick={handleSubmit}>가입하기</SignUpButton>
        </SignUpCont>
        }
      </SignUpBody>
    </div>
  )
}

export default SignUp


const SignUpBody = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  margin-top: 70px;
`

const LogoImg = styled.image`
  font-size:70px;
  margin-bottom:5px;
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
  margin-bottom: 30px;
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