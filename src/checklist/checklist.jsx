import React, { useState, useEffect } from 'react';
import './checklist.css';
import Apple from '../apple.png';
import SugarmonLogo4 from '../character1.png';
import SugarmonLogo3 from '../character2.png';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const checkBoxList = ['식사 순서', '식후 액상과당 섭취', '운동 여부'];

const CheckBoxes = ({ meal, checkedList, setCheckedList, onSubmit }) => {
  const checkedItemHandler = (value, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };

  const checkHandler = (e, value) => {
    checkedItemHandler(value, e.target.checked);
    console.log(value, e.target.checked);
  };

  return (
    <form onSubmit={(e) => onSubmit(e, meal)}>
      <div className="checkbox-group">
        {checkBoxList.map((item, idx) => (
          <div className="checkbox" key={idx}>
            <input
              type="checkbox"
              id={item}
              checked={checkedList.includes(item)}
              onChange={(e) => checkHandler(e, item)}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
      <button className="checklistbutton" type="submit">
        체크 완료
      </button>
    </form>
  );
};

function CheckList() {
  const [breakfastCheckedList, setBreakfastCheckedList] = useState([]);
  const [lunchCheckedList, setLunchCheckedList] = useState([]);
  const [dinnerCheckedList, setDinnerCheckedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const location = useLocation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NzQzNDEzLCJpYXQiOjE3MjIxNTE0MTMsImp0aSI6IjdkMTlmMzVhMzQ1ZDQzZjVhOGQ0MGZhN2IzN2VjNDMwIiwidXNlcl9pZCI6MX0.2s9VjKiwwxYMUM5c9v71HhQNIVPUR4OSRqumZZkNgOI';

  const apiCall = axios.create({
    baseURL: 'https://sugarmon.store/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date');
    setCurrentDate(date);

    const fetchChecklistData = async () => {
      try {
        const itemsResponse = await apiCall.get(
          `/checklist/items/?date=${date}`
        );
        console.log('Items Response:', itemsResponse.data);

        const fetchedItems = itemsResponse.data;

        // 각 식사별로 체크리스트를 설정합니다.
        setBreakfastCheckedList(fetchedItems.breakfast || []);
        setLunchCheckedList(fetchedItems.lunch || []);
        setDinnerCheckedList(fetchedItems.dinner || []);

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

    if (date) {
      fetchChecklistData();
    }
  }, [location.search]);

  const submitChecklist = async (e, meal) => {
    e.preventDefault();
    const data = {
      breakfast: breakfastCheckedList,
      lunch: lunchCheckedList,
      dinner: dinnerCheckedList,
    };

    try {
      const mealData =
        meal === 'Breakfast'
          ? data.breakfast
          : meal === 'Lunch'
          ? data.lunch
          : meal === 'Dinner'
          ? data.dinner
          : [];

      await apiCall.post('/checklist/daily/', {
        meal,
        items: mealData,
      });
      console.log(`${meal} checklist updated successfully.`);
    } catch (error) {
      console.error('Error updating checklist:', error);
      if (error.response && error.response.status === 401) {
        setError('인증 오류: 유효하지 않은 토큰입니다.');
      } else {
        setError('체크리스트 업데이트 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="dateback">
        <h2 className="date">
          {currentDate ? formatDate(currentDate) : '로딩 중...'}
        </h2>
      </div>
      <div className="titlecheck">
        <h2>오늘의 식습관 check list</h2>
        <img className="apple" src={Apple} alt="Apple" />
      </div>
      <div className="meallist">
        <div className="meallistback">
          <h2 className="meal">아침</h2>
          <CheckBoxes
            meal="Breakfast"
            checkedList={breakfastCheckedList}
            setCheckedList={setBreakfastCheckedList}
            onSubmit={submitChecklist}
          />
        </div>
        <div className="meallistback">
          <h2 className="meal">점심</h2>
          <CheckBoxes
            meal="Lunch"
            checkedList={lunchCheckedList}
            setCheckedList={setLunchCheckedList}
            onSubmit={submitChecklist}
          />
        </div>
        <div className="meallistback">
          <h2 className="meal">저녁</h2>
          <CheckBoxes
            meal="Dinner"
            checkedList={dinnerCheckedList}
            setCheckedList={setDinnerCheckedList}
            onSubmit={submitChecklist}
          />
        </div>
      </div>
      <div className="text">
        <img
          className="sugarmonimg4"
          src={SugarmonLogo4}
          alt="Sugarmon Logo 4"
        />
        <h2 className="text2">
          식사 순서는 채소 → 단백질/지방 → 탄수화물을 권장합니다
        </h2>
        <img
          className="sugarmonimg3"
          src={SugarmonLogo3}
          alt="Sugarmon Logo 3"
        />
      </div>
    </div>
  );
}

export default CheckList;