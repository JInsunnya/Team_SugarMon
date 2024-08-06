import React from 'react'
import Header from './Header'
import jinsun from './jinsun.jpeg'
import jihyeon from './jihyeon.jpg'
import jihye from './jihye.png'
import hyeonwook from './hyeonwook.jpeg'
import dooyoung from './dooyoung.jpeg'
import { styled } from 'styled-components'

const Developer = () => {
  return (
    
    <div style={{width:'1000px', margin:'auto'}}>
      <h2 style={{textAlign:'center', fontSize:'30px', marginBottom:'-50px'}}>team. Sugarmon</h2>
      <Body>
        
        <ProfileBody>
          <ProfileImg src={hyeonwook}></ProfileImg>
          <ProfileContent>
            김현욱<br/>백엔드
          </ProfileContent>
        </ProfileBody>
        <ProfileBody>
          <ProfileImg src={jihye}></ProfileImg>
          <ProfileContent>
            채지혜<br/>백엔드
          </ProfileContent>
        </ProfileBody>
        <ProfileBody>
          <ProfileImg src={dooyoung}></ProfileImg>
          <ProfileContent>
            김두영<br/>백엔드
          </ProfileContent>
        </ProfileBody>
        <ProfileBody>
          <ProfileImg src={jinsun}></ProfileImg>
          <ProfileContent>
            김진선<br/>프론트엔드
          </ProfileContent>
        </ProfileBody>
        <ProfileBody>
          <ProfileImg src={jihyeon}></ProfileImg>
          <ProfileContent>
            황지현<br/>프론트엔드
          </ProfileContent>
        </ProfileBody>
      </Body>
    </div>
    
  )
}

export default Developer

const Body = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:50px;
  flex-wrap:wrap;
  margin-top:100px;
`

const ProfileBody = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:30%;
`

const ProfileImg = styled.img`
  width:200px;
  height:200px;
  border-radius:50px;
`

const ProfileContent = styled.div`
  margin-top:20px;

  &:hover{

    color:#91DDCF
  }
`