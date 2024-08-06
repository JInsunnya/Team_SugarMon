// src/components/ChatRoomList.jsx
import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import useChatStore from './chatStore';
import { styled } from 'styled-components';
import { getItem } from 'localforage';
import useChatIdStore from './chatIdstore';

const ChatList = ({isOpen, setIsOpen}) => {
  const [chatRooms, setChatRooms] = useState([]);
  const startChat = useChatStore((state) => (state.startChat));
  const setStartChat = useChatStore((state) => (state.setStartChat));
  // const token = localStorage.getItem('access');
  const token = sessionStorage.getItem('access');
  
  const chatId = useChatIdStore((state) => (state.chatId));
  const setChatId = useChatIdStore((state) => (state.setChatId));


  useEffect(() => {
    // 채팅방 목록을 가져온다
    axios.get('https://sugarmon.store/user/getDoctorUser/', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then(response => {
      setChatRooms(response.data);
      console.log(response.data)
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleRoomClick = async (id) => {
    // 해당 채팅방 id를 가진 채팅방으로 이동
    alert(`${id} <- 이 id를 가진 채팅방 페이지로 이동`);
    setChatId(`${id}`);
    try{
      const response = await axios.post(`https://sugarmon.store/chat/createChatRoom`,{
        opponentId:`${id}`
      },{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setChatId(response.data.id)
      
    }catch(error){

    }
    setStartChat();
    
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  }

  return (
    <>
    <CloseButton onClick={handleCloseClick}>X</CloseButton>
    <div id="chatRoomContainer">
      <h2 style={{textAlign:'center'}}>채팅방 목록</h2>
      <div style={{width:'400px', height:'600px', backgroundColor:"#F7F9F2", borderRadius:'15px', marginBottom:'20px'}}>
        <br />
        {chatRooms.map((chatRoom) => (
          <div
            key={chatRoom.id}
            className="room"
            onClick={() => handleRoomClick(chatRoom.id)}
            style={{width:"350px", background:"#91DDCF", padding:"20px", margin:"20px", boxSizing:'border-box', borderRadius:'20px', display:'flex', justifyContent:'center'}}
          >
            {chatRoom.opponentNickname} {chatRoom.id}님과의 채팅
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

const styles = {
  room: {
    width: '90%',
    height: '100px',
    backgroundColor: 'gainsboro',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '30px',
    cursor: 'pointer'
  }
};

const CloseButton = styled.button`
  position:absolute;
  right:20px;
  top: 30px;
  border:none;
  background-color:#DA7297;
  // background-color:black;
  border-radius:5px;
  width:30px;
  height:25px;
  color:white;
  font-weight:900;
  z-index:1;
`

export default ChatList;
