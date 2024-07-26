import React, { useEffect, useState } from 'react'
import Header from './Header';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')):[];
  

  useEffect(() => {
    console.log(user)
  },[])


  return (
    <div>
      <Header></Header>
      <MyPageBody>
        <ProfileBody>
          <image>Profile Image</image>
          <div >
            <div style={{display:'flex', justifyContent:"center", alignItems:'center'}}>
              <p style={{color:"#667BC6", fontSize:'40px', fontWeight:'800'}}>{user.displayName}</p>
              <p style={{fontSize:'30px', fontWeight:'700', color:'grey'}}>&nbsp;님</p>
            </div>
            <ModiButton>프로필 수정하기</ModiButton>
          </div>
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
            <Link  style={{textDecoration:"none"}}>
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
  margin-top:120px;
`

const FunctionBody = styled.div`
  display:flex;
  margin-top: 100px;
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
  background:#FFB4C2;
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
  background:#FDFFD2;
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
