// src/components/ChatRoomList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useChatStore from './chatStore';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const startChat = useChatStore((state) => (state.startChat));
  const setStartChat = useChatStore((state) => (state.setStartChat));


  useEffect(() => {
    // 채팅방 목록을 가져온다
    axios.get('http://3.37.188.30:8000/chat/getMyChatRoom', {
      headers: {
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyODYyMDQ4LCJpYXQiOjE3MjI4NTg0NDgsImp0aSI6IjUwYjBjYzJlOTdiYjQ1YjM5ZWNiMzczYzFlYzBkNjRlIiwidXNlcl9pZCI6MTF9.BjRBgrwL2Fcv1wpfQoxa2iEgLKWwWTEke2iEtXuLx28`
      }
    }).then(response => {
      setChatRooms(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleRoomClick = (id) => {
    // 해당 채팅방 id를 가진 채팅방으로 이동
    alert(`${id} <- 이 id를 가진 채팅방 페이지로 이동`);
    setStartChat();
  };

  return (
    <div id="chatRoomContainer">
      <h2 style={{textAlign:'center'}}>채팅방 목록</h2>
      <div style={{width:'400px', height:'600px', backgroundColor:"#F7F9F2", borderRadius:'15px', marginBottom:'20px'}}>
        <br />
        {chatRooms.map((chatRoom) => (
          <div
            key={chatRoom.id}
            className="room"
            onClick={() => handleRoomClick(chatRoom.id)}
            style={styles.room}
          >
            {chatRoom.opponentNickname} 님과의 채팅
          </div>
        ))}
      </div>
    </div>
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

export default ChatList;
