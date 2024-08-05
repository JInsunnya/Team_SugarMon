import React, { useEffect, useState } from 'react'
import Header from './Header';
import { keyframes, styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import { Link } from 'react-router-dom';
import useStore from './store';
import axios from 'axios';
import Character from './character2.png'

const MyPage = () => {
  const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')):[];
  const isUser = useStore((state) => state.user);
  const token = localStorage.getItem('access');
  const [userData, setUserData] = useState([]);
  

  useEffect(() => {

    async function getInformation(){
      try{
        const response = await axios.get(`https://sugarmon.store/user/me/`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setUserData(response.data);
    }catch(error){
      console.log(error)
    }}
    
    getInformation();
  },[])


  return (
    <div>
      <Header></Header>
      <MyPageBody>
        <ProfileBody>
          
          {isUser?
          <div >
          {/* <img src={user.photoURL} style={{borderRadius:"50%", width:'170px', height:'170px'}}/> */}
          <img src={Character} style={{borderRadius:"50%", width:'170px', height:'170px'}}/>

          <div style={{display:'flex', justifyContent:"center", alignItems:'center'}}>
            <p style={{color:"#667BC6", fontSize:'40px', fontWeight:'800'}}>{user.displayName}</p>
            <p style={{fontSize:'30px', fontWeight:'700', color:'grey', marginTop:'10px'}}>&nbsp;{userData.nickname}님</p>
          </div>
          {/* <ModiButton>프로필 수정하기</ModiButton> */}
        </div>
        :
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Link to='/login' style={{textDecoration:"none", color:"black", fontSize:'20px', fontWeight:'700', marginBottom:'100px'}}>로그인 하기</Link>
        </div>}
          
        </ProfileBody>
        <FunctionBody>
          <HabitCheck>
            <p>습관을 유지한 지</p>
            <div style={{display:"flex", alignItems:"center", marginTop:'-40px'}}>
              <p style={{color:"#FDFFD2", fontWeight:"900", fontSize:"50px", marginRight:'10px'}}>5</p>
              <p>일째에요</p>
            </div>
          </HabitCheck>
          <Link to={"/developerintroduction"} style={{textDecoration:"none"}}>
            <DeveloperInt>
              <p >개발자 소개👩🏻‍💻</p>
            </DeveloperInt>
          </Link>
          <Question>
            <Link to={'/question'} style={{textDecoration:"none"}}>
              <p style={{color:'black'}}>
              자주묻는 질문🤔
              </p>
            </Link>
          </Question>
        </FunctionBody>
      </MyPageBody>
    </div>
  )
}

export default MyPage;

const MyPageBody = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`

const ProfileBody = styled.div`
  display:flex;
  gap:70px;
  margin-top:100px;
`

const FunctionBody = styled.div`
  display:flex;
  margin-top: 10px;
  gap: 70px;
`

const HabitCheck = styled.div`
 width: 200px;
 height: 200px;
 background:rgba(218, 114, 151,.7);
 border-radius:20px;
 font-size:20px;
 font-weight:700;
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
 color:white;

`

const DeveloperInt = styled.div`
  width: 200px;
  height:200px;
  background:rgba(145, 221, 207,.7);
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:700;
  font-size:20px;
  text-decoration:none;
  color:black;
`

const Question = styled.div`
  width: 200px;
  height: 200px;
  background:#F7F9F2;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:700;
  font-size:20px;
`

const ModiButton = styled.button`
  border:none;
  background:none;
  color:grey;
  padding: 0;
  position:relative;
  top:-30px;

`
