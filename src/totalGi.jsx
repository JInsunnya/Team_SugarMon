import React, { useState, useEffect } from 'react';
import './totalGI.css'
import SugarmonLogo2 from './SugarmonLogo2.jpg';
import SugarmonLogo4 from './character1.png';
import Egg from './egg.png';
import Salad from './salad.png';
import Sushi from './sushi.png';
import Banana from './banana.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chat from './components/Chat';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NzQzNDEzLCJpYXQiOjE3MjIxNTE0MTMsImp0aSI6IjdkMTlmMzVhMzQ1ZDQzZjVhOGQ0MGZhN2IzN2VjNDMwIiwidXNlcl9pZCI6MX0.2s9VjKiwwxYMUM5c9v71HhQNIVPUR4OSRqumZZkNgOI';

const apiCall = axios.create({
  baseURL: 'https://sugarmon.store/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

function TotalGi() {
  const [currentDate, setCurrentDate] = useState(null);
  const [breakfastCheckedList, setBreakfastCheckedList] = useState([]);
  const [lunchCheckedList, setLunchCheckedList] = useState([]);
  const [dinnerCheckedList, setDinnerCheckedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // 한국 표준시 (KST)로 변환
    const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC + 9시간

    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    const fetchChecklistData = async () => {
      try {
        // 요청을 보내서 일일 체크리스트 데이터를 가져옵니다
        const dailyResponse = await apiCall.get('/checklist/daily/');

        console.log('Daily Response:', dailyResponse.data);

        // 일일 체크리스트 데이터에서 아침, 점심, 저녁 체크리스트 항목을 설정합니다
        setBreakfastCheckedList(dailyResponse.data.breakfast || []);
        setLunchCheckedList(dailyResponse.data.lunch || []);
        setDinnerCheckedList(dailyResponse.data.dinner || []);

        // 일일 체크리스트 데이터에서 날짜를 설정합니다
        const fetchedDate = dailyResponse.data.date;
        setCurrentDate(fetchedDate || new Date().toISOString().split('T')[0]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          setError('인증 오류: 유효하지 않은 토큰입니다.');
        } else if (error.response && error.response.status === 404) {
          setError('요청한 리소스를 찾을 수 없습니다.');
        } else {
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        setLoading(false);
      }
    };

    fetchChecklistData();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <div>
      <div className="mainlogo">
        <Link to={"/"}>
          <img className="logo2" src={SugarmonLogo2} alt="Sugarmon Logo 2" />
        </Link>
      </div>
      <div>
        <h2 className="date">
          {currentDate ? formatDate(currentDate) : '로딩 중...'}
        </h2>
      </div>
      <div>
        <div className="totalgi">
          <img className="logo4" src={SugarmonLogo4} alt="Sugarmon Logo 4" />
          <h2>오늘의</h2>
          <h2 className="gi">GI</h2>
        </div>
        <div className="meal">
          <div className="mealdetail">
            <img className="egg" src={Egg} alt="Egg" />
            <h2 className="mealdetailtext">아침 기록하기</h2>
            <nav>
              <ul className="nav ul">
                <li className="nav li">
                  <a href={`/Pick0`}>
                    <button className="breakfastbutton"></button>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mealdetail">
            <img className="salad" src={Salad} alt="Salad" />
            <h2 className="mealdetailtext">점심 기록하기</h2>
            <nav>
              <ul className="nav ul">
                <li className="nav li">
                  <a href={`/Pick1`}>
                    <button className="lunchbutton"></button>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mealdetail">
            <img className="sushi" src={Sushi} alt="Sushi" />
            <h2 className="mealdetailtext">저녁 기록하기</h2>
            <nav>
              <ul className="nav ul">
                <li className="nav li">
                  <a href={`/Pick2`}>
                    <button className="dinnerbutton"></button>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mealdetail">
            <img className="banana" src={Banana} alt="Banana" />
            <h2 className="mealdetailtext">간식 기록하기</h2>
            <nav>
              <ul className="nav ul">
                <li className="nav li">
                  <a href={`/Pick3`}>
                    <button className="snackbutton"></button>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <Chat/>
    </>
  );
}

export default TotalGi;
