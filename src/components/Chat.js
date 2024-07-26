import React, { useState } from 'react'
import { styled } from 'styled-components'

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  }

  const handleCloseClick = () => {
    setIsOpen(false);
  }

  return (
    <div style={{position:"fixed", bottom:"0",right:"0", zIndex:"9"}}>
      {!isOpen ? <OpenButton onClick={handleOpenClick}>Chat<br></br>💬</OpenButton>
      : 
      <>
        
        <ChatBody>
          <CloseButton onClick={handleCloseClick}>X</CloseButton>
          <DoctorProfile>
            <ProfileImg>
              <img/>
            </ProfileImg>
            <ProfileText>
              <p style={{fontWeight:"800", fontSize:"20px"}}>내과 전문의 김00</p>
              <p style={{fontSize:"14px", marginTop:'-12px'}}>동대문구 이문동 몬스터 병원</p>
            </ProfileText>
          </DoctorProfile>
          <div style={{overflow:"scroll", height:"280px"}}>
            <MySpeech>

            </MySpeech>
            <DoctorSpeech>

            </DoctorSpeech>
            <MySpeech></MySpeech>
          </div>
          <div style={{display:"flex", justifyContent:"center", position:"relative"}}>
            <TextInput/>
            <ButtonStyle for="input-file">+</ButtonStyle>
            <FileInput type='file' id="input-file" style={{display:"none"}}/>
            
          </div>
        </ChatBody>
        
      </>
      }
    </div>
  )
}

export default Chat


const OpenButton = styled.button`
  width:80px;
  height:80px;
  border-radius:15px;
  border:none;
  background-color:#667BC6;
  font-size:20px;
  font-weight:900;
  position:relative;
  top:-20px;
  right:20px;
  box-shadow: 5px 5px 10px grey;
  color:white;

`

const ChatBody = styled.div`
  width:450px;
  height:600px;
  background-color:#FDFFD2;
  border-radius:30px;
  position:relative;
  top:-20px;
  transtion:
`

const CloseButton = styled.button`
  position:absolute;
  right:20px;
  top: 10px;
  border:none;
  background-color:#667BC6;
  border-radius:5px;
  width:30px;
  height:25px;
  color:white;
  font-weight:900;
`

const MySpeech = styled.div`
  width:200px;
  height:50px;
  background-color:#667BC6;
  border-radius:15px;
  // display:flex;
  position:relative;
  right:-230px;
  top:20px;
  margin-bottom:50px;
`

const DoctorSpeech = styled.div`
  width:200px;
  height:150px;
  background-color:lightgrey;
  border-radius:15px;
  position:relative;
  right: -30px;
  // margin-bottom:50px;
`

const DoctorProfile = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const ProfileImg = styled.div`
  width:100px;
  height:100px;
  background-color:grey;
  border-radius:30%;
  margin-top:30px;
`

const ProfileText = styled.div`
  text-align:center;

`

const TextInput = styled.textarea`
  width:400px;
  height:80px;
  position:relative;
  top:-20px;
  border:none;
  border-radius:15px;
  overflow-y:scroll;
  padding:15px;
  box-sizing:border-box;

  &:focus{
    outline:none;
  }
`

const FileInput = styled.input`
  width:30px;
  height:30px;
  position:absolute;
  right:40px;
  top:10px;
  border:none;
`

const ButtonStyle = styled.label`
  // padding: 6px 25px;
  background-color:#667BC6;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  position:absolute;
  right:40px;
  top:10px;
  height:30px;
  width:30px;
  text-align:center;
  font-size:20px;
  font-weight:800;
`
