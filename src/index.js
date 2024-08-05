import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import Main from './Main';
import Login from './Login';
import app from './firebase.js'
import { RecoilRoot } from 'recoil';
import MyPage from './MyPage';
import Developer from './Developer';
import DoctorSignUp from './DoctorSignUp';
import ChatRoom from './ChatRoom';
import Question from './Question';

const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/mypage' element={<MyPage/>}></Route>
        <Route path='/developerIntroduction' element={<Developer></Developer>}></Route>
        <Route path='/doctorsignup' element={<DoctorSignUp/>}></Route>
        <Route path='/question' element={<Question></Question>}></Route>

      </Routes>
    
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App/>
      </Router>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
