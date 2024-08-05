import React, { useEffect, useState } from 'react'
import Header from './Header'
import { keyframes, styled } from 'styled-components'
import Chat from './components/Chat'
import character1 from './character1.png'
import character2 from './character2.png'
import FoodLoop from './components/FoodLoop'
import { useActionData } from 'react-router-dom'
// import GiLoop from './components/GiLoop'

const Main = () => {
  const foods = ["🍎", "🥓", "🍦", "🍚", "🥒","🍿","🍩","🍜","🧂","🍬","🍔","🥞","🫐","🍉","🥔","🍠"]
  const gi = [36, 49, 65, 93, 15, 72, 86, 73, 10, 80, 61, 80, 34, 72, 90, 55 ]
  const [show, setShow] = useState(false);
  
  const handleScroll = () => {
    if(window.scrollY > window.innerHeight /.7){
      setShow(true);
    } else{
      setShow(false);
    }

  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
  
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }


}, [])

  return (
    <div>
      <Header></Header>
      <FuncMain>
        <MainTitle>슈가몬과 함께하는<br/> 스마트 혈당 사냥!</MainTitle>
        <MainText>
          현대인의 가장 큰 고민 혈당, 슈가몬으로 스마트하게 해결하세요!
        </MainText>
        <ImgAni>
          <CharImg1 src={character1}></CharImg1>
          <CharImg2 src={character2}></CharImg2>
        </ImgAni>
      </FuncMain>
      <FuncBody>
        <FucnEl style={{background:"white", textAlign:"center", flexDirection:"column"}}>
          당신의 한 끼, 당으로부터 얼마나 안전할까요?<br/>
          나의 한 끼 GI 지수로 알아보세요
          <FoodLoop items={foods} gi={false}></FoodLoop>
          <FoodLoop items={gi} gi={true}></FoodLoop>
        </FucnEl>
        <FucnEl style={{background:"rgba(247, 247, 247, 1)"}}>
            <div style={{flexGrow:"1", position:"relative", left:"100px"}}>
              <Func1Title>지키기 어려운 당 관련 습관,<br/> 슈가몬으로 체크해보세요</Func1Title>
              <p style={{fontWeight:"600", fontSize:"17px", color:"grey", position:"relative", left:"150px", top:"-20px", lineHeight:"30px"}}>
                채소{"->"}단백질{"->"} 탄수화물 순의 식사, 식후 액상과당 섭취 여부, 운동 여부<br/> 모두 혈당을 낮추기 위해 필수적인 습관이라는 점 알고계셨나요?<br/>
                이 모든 습관들을 관리해드려요
              </p>
            </div>
            <div style={{position:"relative", right:"130px", bottom:"20px", fontSize:"120px", zIndex:"1", transform: "scaleX(-1)"}}>✏️</div>
            <Memo>
              <div>
                <p style={{fontWeight:"700", fontSize:"25px"}}>건강한 순서로 식사하기 &nbsp;&nbsp;✅</p>
              </div>
              <div>
                <p style={{fontWeight:"700", fontSize:"25px"}}>식후 액상과당 먹지 않기 &nbsp;&nbsp;✅</p>
              </div>
              <div>
                <p style={{fontWeight:"700", fontSize:"25px"}}>하루 30분 이상 운동 &nbsp;&nbsp;✅</p>
              </div>
            </Memo>
        </FucnEl>
        <FucnEl style={{background:"lightgrey", gap:"150px"}}>
          <LapTop></LapTop>
          <div style={{display:"flex", flexDirection:"column", textAlign:"end"}}>
            <Func2Title>집에서도 병원에 온 것처럼<br/>정확한 진료를 받아보세요</Func2Title>
            <Func2Text>의료진과의 1:1 채팅을 통해<br/>나의 증상을 정확하고 간편하게 상담 받을 수 있어요</Func2Text>
          </div>
          
        </FucnEl>
      </FuncBody>
      {show ? <GotoSignUp href='/signup'>회원가입하고 슈가몬의 다양한 기능 체험해보기</GotoSignUp> : <></>}
      
      <Chat></Chat>
    </div>
  )
}

export default Main

const FuncBody = styled.div`
  // display:flex;

`

const FucnEl = styled.div`
  // flex-grow:1;
  height: 600px;
  display:flex;
  // flex-direction:column;
  gap:30px;
  justify-content:center;
  align-items:center;
  font-weight:800;
  font-size:30px;
  // text-align:center;
`

const FuncMain = styled.div`
  height: 640px;
  background:#F7F9F2;
  margin:-50px;
  // position:relative;
  // top:165px;
  

`

const MainTitle = styled.p`
  position:relative;
  top: 120px;
  left: 0px;
  font-size: 50px;
  font-weight: 800;
  text-align:center;
`

const MainText = styled.p`
  position:relative;
  top:90px;
  text-align:center;
  font-weight:600;
  color:grey;

`

const GotoSignUp = styled.a`
  text-decoration:none;
  color:white;
  font-weight:700;
  font-size: 18px;
  background-color:rgba(218, 114, 151, 1);
  padding:20px;
  display:flex;
  width:340px;
  position:fixed;
  bottom:20px;
  left: 530px;
  border-radius:50px;
  text-align:center;

`

const Func1Title = styled.p`
  position: relative;
  left: 150px;
  font-size:32px;
  color:black;
`

const Memo = styled.div`
  width: 325px;
  background: white;
  height: 500px;
  // flex-grow:1;
  position:absolute;
  right: 240px;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  gap:30px;
  // border-radius:50
`

const Func2Title = styled.p`
  font-size: 32px;
`

const Func2Text = styled.p`
  font-weight: 700;
  font-size: 17px;
  color:white;
  margin-top:-10px;
`

const LapTop = styled.div`
  width: 670px;
  background:white;
  height: 450px;
  position:relative;
  bottom:-75px;
  border-radius:15px;

`

const bounce = keyframes`
0% {
  top: 100px;
  animation-timing-function: ease-in;
}
50% {
  top: 120px;
  
  animation-timing-function: ease-out;
}
55% {
  top: 140px; 
  animation-timing-function: ease-in;
}
65% {
  top: 120px; 
  animation-timing-function: ease-out;
}
95% {
  top: 100px;
  animation-timing-function: ease-in;
}
100% {
  top: 100px;
  animation-timing-function: ease-in;
}
`

const CharImg1 = styled.img`
  width:250px;
  position:relative;
  left:570px;
  top:120px;
  // animation: ${bounce} 1s infinite;

`

const CharImg2 = styled.img`
  width:130px;
  position:relative;
  right:-570px;
  top:120px;
  // animation: ${bounce} 1s infinite;
`

const ImgAni = styled.div`
  
`

// const appear = keyframes`
// 0%{
//   top: 100px;
//   opacity: 0;
// }

// 100%{
// top:150px;
// opacity: 1;
// }

// `