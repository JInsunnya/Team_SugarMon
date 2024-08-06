import React from 'react'
import { styled } from 'styled-components';
import Character from './character2.png'

const Question = () => {
  return (
    <QuestionBody>
      <div style={{display:'flex', alignItems:'center', marginTop:'100px'}}>
        <img src={Character} style={{width:'100px', height:'100px'}}/>
        <Title>자주 묻는 질문</Title>
      </div>
      <QBody>
        <QTitle> Q1. 슈가몬은 어떤 서비스인가요?</QTitle>
        <QContent>슈가몬은 잘못된 식습관으로 인한 높은 혈당으로 고통받는 현대인들을 위한 서비스입니다.
          <br/>주요 기능인 사용자의 하루 식사 속 GI 지수 입력, 혈당 관련 습관 체크, 의료진과의 1:1 채팅 서비스 등을 통해 혈당을 쉽고 스마트하게 관리해줍니다.
        </QContent>
      </QBody>
      <QBody>
        <QTitle>Q2. 의사와의 채팅은 어떤 분들과 하게 되는 건가요?</QTitle>
        <QContent>의료진과의 채팅은 슈가몬 가입 시 의료진 인증 실시하여 이를 통과한 실제 의사 유저 분들과 1:1 매칭을 통해 채팅할 수 있는 서비스입니다.<br/>
        1:1 채팅 서비스를 통해 쉽고 빠르게 사용자의 증상을 공유하고 이에 대한 검진을 받을 수 있습니다.</QContent>
      </QBody>
      <QBody>
        <QTitle></QTitle>
        <QContent></QContent>
      </QBody>
      <QBody>
        <QTitle></QTitle>
        <QContent></QContent>
      </QBody>
      <QBody>
        <QTitle></QTitle>
        <QContent></QContent>
      </QBody>
      
      
    </QuestionBody>
    
  )
}

export default Question;


const QuestionBody = styled.div`
  width:1000px;
  margin: auto;
`

const Title = styled.h2`
  margin-left:10px;
  
  
`

const QBody = styled.div`
  margin-top:50px;
`

const QTitle = styled.p`
  font-size:20px;
  
  &:hover{
    color:#91DDC;
  }
`
const QContent = styled.p`

`



