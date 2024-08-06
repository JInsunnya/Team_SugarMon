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
import Calendar from './calendar';
import TotalGi from './totalGi';
import Pick0 from './foodpick0';
import Pick1 from './foodpick1';
import Pick2 from './foodpick2';
import Pick3 from './foodpick3';
import CheckList from './checklist/checklist';


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
        <Route path='/home' element={<Calendar></Calendar>}></Route>
        <Route path='/gi' element={<TotalGi></TotalGi>}></Route>
        <Route path='/Pick0' element={<Pick0></Pick0>}></Route>
        <Route path='/Pick1' element={<Pick1></Pick1>}></Route>
        <Route path='/Pick2' element={<Pick2></Pick2>}></Route>
        <Route path='/Pick3' element={<Pick3></Pick3>}></Route>
        <Route path='checklist' element={<CheckList></CheckList>}></Route>
        

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
