import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import useStore from './store';

const DoctorSignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickName, setNickName] = useState('');
  const [subject, setSubject] = useState('');
  const [affiliation, setAffiliation] = useState(''); 
  const [email, setEmail] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);


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
  const handleSubjectChange = (event) => {
    console.log(event.target.value)
    setSubject(event.target.value);
  }
  const handleAffiliationChange = (event) => {
    console.log(event.target.value)
    setAffiliation(event.target.value);
  }
  
  const handleEmailChange = (event) => {
    console.log(event.target.value)
    setEmail(event.target.value);
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
        isDoctor:true
      })
      setIsComplete(true);
      setUser(response.data.access);
      
    } catch(error){
      console.log(error)
    }

  }

  return (
    <>
    {!isComplete ? 
    <div>
      <SignUpBody>
        <LogoImg>Logo</LogoImg>
        <GotoLogin>
          <p style={{color:"grey", fontSize:'15px'}}>이미 회원이신가요?</p>
          <Link to='/login' style={{textDecoration:"none"}}>
            <p style={{marginTop:"-10px", color:"#667BC6", fontSize:'15px'}}>로그인하기</p>
          </Link>
        </GotoLogin>
        
        <SignUpCont>
          <SignUpInput placeholder='아이디' value={id} onChange={handleIdChange}></SignUpInput>
          <SignUpInput  type='password' placeholder='비밀번호' value={password} onChange={handlePasswordChange}></SignUpInput>
          <SignUpInput type='password' placeholder='비밀번호 확인' value={password2} onChange={handlePassword2Change}></SignUpInput>
          <SignUpInput placeholder='닉네임' value={nickName} onChange={handleNickNameChange}></SignUpInput>
          {/* <SignUpInput placeholder='진료과목' value={subject} onChange={handleSubjectChange}></SignUpInput> */}
          {/* <SignUpInput placeholder='소속' value={affiliation} onChange={handleAffiliationChange}></SignUpInput> */}
          <SignUpInput placeholder='이메일' value={email} onChange={handleEmailChange}></SignUpInput>
          <p style={{marginTop:'-15px', marginBottom:'-20px', color:'grey'}}>의사면허 확인 가능한 파일 첨부</p>
          {/* <FileBox class="filebox">
            
            <FileStyle class="upload-name" value="첨부파일" placeholder="의사면허 확인 가능한 파일 첨부"/>
            <FindButton for="file">파일<br/>찾기</FindButton> 
            <File type="file" id="file"/>
          </FileBox> */}
          <SignUpButton onClick={handleSubmit}>가입하기</SignUpButton>
        </SignUpCont>
      </SignUpBody>
    </div>
    :
    <SignUpBody>
      <div style={{fontSize:'70px', marginTop:'150px'}}>Logo</div>
      <p style={{fontSize:'40px', fontWeight:'700', color:"#667BC6"}}>회원가입 요청이 완료되었습니다🥳</p>
      <p style={{marginTop:'-25px', fontSize:'18px', fontWeight:'600', color:'grey'}}>첨부해주신 의사 면허증 검토 후 회원가입 요청 수락까지 약 1일에서 2일의 시간이 소요됩니다.</p>
      <Link to="/">
        <button style={{border:'none', background:"none",fontSize:'20px', fontWeight:'700', marginTop:'20px'}}>홈으로 가기</button>
      </Link>
    </SignUpBody>
     }
    </>
  )
}

export default DoctorSignUp

const SignUpBody = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  margin-top: 30px;
`

const LogoImg = styled.image`
  font-size:40px;
  // margin-bottom:5px;
`

const SignUpCont = styled.div`
  display:flex;
  flex-direction:column;
  gap:25px;
`

const SignUpInput = styled.input`
  width: 350px;
  height: 50px;
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
  margin-bottom: 10px;
`

const AnotherWay = styled.div`

`

const UserButton = styled.button`
  width:350px;
  height:50px;
  border:none;
  border-radius: 10px;
  font-size:17px;
  font-weight:700;

  &:focus{
    outline:none;
  }

`

const FileBox = styled.div`
  display:flex;

`

const FileStyle = styled.input`
  display: inline-block;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;

    &:focus{
      outline:none;
    }

`

const FindButton = styled.label`
  display: inline-block;
  padding:10px;
  color: #fff;
  // vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  margin-left: 10px;
  width:60px;
  height:40px;
  font-size:12px;
  text-align:center;
  box-sizing:border-box;
`

const File = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
`