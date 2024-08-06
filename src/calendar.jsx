import React, { useState, useEffect } from 'react';
import './calendar.css';
import { generateDatesForMonth } from './calendarplus.jsx';
import SugarmonLogo2 from './SugarmonLogo2.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chat from './components/Chat';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NzQzNDEzLCJpYXQiOjE3MjIxNTE0MTMsImp0aSI6IjdkMTlmMzVhMzQ1ZDQzZjVhOGQ0MGZhN2IzN2VjNDMwIiwidXNlcl9pZCI6MX0.2s9VjKiwwxYMUM5c9v71HhQNIVPUR4OSRqumZZkNgOI';

const apiCall = axios.create({
  baseURL: 'http://3.37.188.30:8000/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDates = () => {
      const datesForMonth = generateDatesForMonth(year, month);
      console.log('Generated dates:', datesForMonth);
      setDates(datesForMonth);
    };
    fetchDates();
  }, [year, month]);

  const handleDateClick = (date) => {
    const formattedDate = date
      .toLocaleDateString('ko-KR')
      .split('/')
      .map((item) => item.padStart(2, '0'))
      .join('-');
    console.log('Selected date:', formattedDate);
    navigate(`/checklist?date=${formattedDate}`);
  };

  return (
    <>
    <div>
      <div className="SugarmonLogo2div">
        <Link to={"/"} style={{width:"400px"}}>
          <img
            className="SugarmonLogo2"
            src={SugarmonLogo2}
            alt="SugarmonLogo2"
          />
        </Link>
      </div>
      <div className="calendar">
        <header className="header">
          <button
            className="button"
            onClick={() => setMonth((prev) => (prev === 0 ? 11 : prev - 1))}
            style={{background:"#91DDCF"}}
          >
            이전 월
          </button>
          <h2 className="datefont">{`${year}년  ${month + 1}월`}</h2>
          <button
            className="button"
            onClick={() => setMonth((prev) => (prev === 11 ? 0 : prev + 1))}
            style={{background:"#91DDCF"}}
          >
            다음 월
          </button>
        </header>
        <div className="dates">
          <nav>
            <ul className="calendar-grid">
              {dates.map((date, index) => (
                <li className="calendar-cell" key={index}>
                  <button
                    className="date-button"
                    onClick={() => handleDateClick(date)}
                    style={{fontWeight:'900', fontSize:'18px'}}
                  >
                    {date.getDate()}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <Chat/>
    </>
  );
}

export default Calendar;
