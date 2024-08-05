// src/components/ChatRoom.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';

const ChatRoom = ({isOpen, setIsOpen}) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);
  const token = localStorage.getItem('access')

  useEffect(() => {
    // 이전에 보냈었던 메세지들을 가져와서 화면에 띄운다
    axios.get('http://3.37.188.30:8000/chat/getChatMessages/1', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then(response => {
      setMessages(response.data);
    });

    // 웹소켓 객체 생성
    socketRef.current = new window.WebSocket('ws://3.37.188.30:8000/ws/chatRoom/1');

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      axios.post('http://3.37.188.30:8000/chat/checkIfMyMessage', { senderId: data.senderId }, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }).then(response => {
        const isMe = response.data['isMe'];
        setMessages(prevMessages => [...prevMessages, { ...data, isMyChat: isMe }]);
      });
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    socketRef.current.send(JSON.stringify({
      chatRoomId: 1,
      content: inputMessage,
      authorization: `Bearer ${token}`
    }));
    setInputMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault(); // 엔터키로 폼 제출 방지
    }
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  }

  return (
    <>
    <CloseButton onClick={handleCloseClick}>X</CloseButton>
    <div>
      <div id="chatContainer" style={styles.chatContainer} ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={message.isMyChat ? styles.myChat : styles.yourChat}
          >
            {message.content}
          </div>
        ))}
      </div>
      <br />
      
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <ChatInput
          id="messageInput"
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton id="sendButton" onClick={sendMessage}>Send</SendButton>
      </div>
    </div>
    </>
  );
};

const styles = {
  chatContainer: {
    width: '450px',
    height: '600px',
    backgroundColor: '#F7F9F2',
    // paddingTop: '50px',
    overflowY: 'scroll',
    borderRadius:'30px',
    position:'relative'
  },
  yourChat: {
    backgroundColor: 'rgb(247,247,247)',
    padding: '10px 20px',
    display: 'inline-block',
    marginLeft: '30px',
    marginBottom: '20px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    float: 'left',
    clear: 'both'
  },
  myChat: {
    backgroundColor: '#91DDCF',
    padding: '10px 20px',
    display: 'inline-block',
    marginRight: '30px',
    marginBottom: '20px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    float: 'right',
    clear: 'both'
  }
};

const ChatInput = styled.textarea`
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

const SendButton = styled.button`
  width:50px;
  height: 80px;
  border:none;
  border-radius:10px;
  background:#DA7297;
  font-weight:800;
  position:relative;
  top:-18px;
  color:white;
`

const CloseButton = styled.button`
  position:absolute;
  right:20px;
  top: 10px;
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

export default ChatRoom;
