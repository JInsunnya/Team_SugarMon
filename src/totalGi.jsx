import React, { useState, useEffect } from 'react';
import './totalGI.css';
import SugarmonLogo2 from './SugarmonLogo2.jpg';
import SugarmonLogo4 from './character1.png';
import Egg from './egg.png';
import Salad from './salad.png';
import Sushi from './sushi.png';
import Banana from './banana.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  const [totalGI, setTotalGI] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 체크리스트 데이터 요청
        const dailyResponse = await apiCall.get('/checklist/daily/');
        console.log('Daily Response:', dailyResponse.data);

        setBreakfastCheckedList(dailyResponse.data.breakfast || []);
        setLunchCheckedList(dailyResponse.data.lunch || []);
        setDinnerCheckedList(dailyResponse.data.dinner || []);
        setCurrentDate(
          dailyResponse.data.date || new Date().toISOString().split('T')[0]
        );

        // GI 데이터 요청
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const giRequests = [0, 1, 2, 3].map((when) =>
          apiCall.get(`/gIndex/getTodayGI/${year}/${month}/${day}/${when}`)
        );

        const giResponses = await Promise.all(giRequests);
        const giData = giResponses.reduce((acc, response, index) => {
          const key = ['breakfast', 'lunch', 'dinner', 'snack'][index];
          acc[key] = response.data.gI || 0;
          return acc;
        }, {});

        setTotalGI(giData);
        setLoading(false);
      } catch (error) {
        console.error(
          'Error fetching data:',
          error.response ? error.response.data : error.message
        );
        if (error.response && error.response.status === 401) {
          setError('인증 오류: 유효하지 않은 토큰입니다.');
        } else if (error.response && error.response.status === 404) {
          setError('요청한 리소스를 찾을 수 없습니다.');
        } else if (error.response && error.response.status === 500) {
          setError('서버 오류: 서버에서 문제가 발생했습니다.');
        } else {
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="mainlogo">
        <img className="logo2" src={SugarmonLogo2} alt="Sugarmon Logo 2" />
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
            <p className="total-gi-value">{totalGI.breakfast.toFixed(0)}</p>
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
            <p className="total-gi-value">{totalGI.lunch.toFixed(0)}</p>
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
            <p className="total-gi-value">{totalGI.dinner.toFixed(0)}</p>
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
            <p className="total-gi-value">{totalGI.snack.toFixed(0)}</p>
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
        <div>
          <h2 className="gigi">저당 55 ↓ | 중당 59-69 | 고당 70 ↑</h2>
        </div>
      </div>
    </div>
  );
}

export default TotalGi;