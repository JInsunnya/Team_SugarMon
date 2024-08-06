import React, { useState, useEffect } from 'react';
import SugarmonLogo1 from '../SugarmonLogo1.jpg';
import './foodpick.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function App() {
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [completedFoods, setCompletedFoods] = useState([]);
  const [error, setError] = useState(null);
  const [when, setWhen] = useState(null);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NzQzNDEzLCJpYXQiOjE3MjIxNTE0MTMsImp0aSI6IjdkMTlmMzVhMzQ1ZDQzZjVhOGQ0MGZhN2IzN2VjNDMwIiwidXNlcl9pZCI6MX0.2s9VjKiwwxYMUM5c9v71HhQNIVPUR4OSRqumZZkNgOI';

  const apiCall = axios.create({
    baseURL: 'http://3.37.188.30:8000/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const whenParam = query.get('when');

  useEffect(() => {
    setWhen(whenParam);

    const fetchFoods = async () => {
      try {
        const response = await apiCall.get(`/gIndex/getFood`);
        console.log('Response:', response);

        const sortedFoods = response.data.sort((a, b) =>
          a.foodName.localeCompare(b.foodName, 'ko-KR')
        );

        setFoods(sortedFoods);
      } catch (error) {
        console.error('Error fetching foods:', error);
        setError(error.message);
      }
    };

    fetchFoods();
  }, [apiCall, whenParam]);

  const handleFoodClick = (food) => {
    if (selectedFoods.includes(food)) {
      setSelectedFoods(selectedFoods.filter((f) => f !== food));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const handleComplete = async () => {
    try {
      const foodsToRegister = selectedFoods.map((food) => ({
        name: food.foodName,
        ateDate: new Date().toISOString().split('T')[0],
        when: when,
      }));

      console.log('Foods to register:', foodsToRegister);

      await apiCall.post('/ateFood/registerAteFood', foodsToRegister);
      setCompletedFoods(selectedFoods);
    } catch (error) {
      console.error('Error registering foods:', error);
      setError(error.message);
    }
  };

  const handleClearSelection = async () => {
    try {
      selectedFoods.forEach((food) =>
        console.log(`Deleting food ID: ${food.id}`)
      );

      const deleteRequests = selectedFoods.map((food) =>
        apiCall.delete(`/ateFood/deleteAteFood/${food.id}`)
      );

      await Promise.all(deleteRequests);

      setFoods(foods.filter((food) => !selectedFoods.includes(food)));
      setSelectedFoods([]);
      setCompletedFoods([]);
    } catch (error) {
      console.error('Error deleting foods:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div>
        <img className="logo1" src={SugarmonLogo1} alt="Sugarmon Logo" />
      </div>
      <div className="top-bar">
        <div className="sidebar">
          <ul>
            {completedFoods.map((food) => (
              <li key={food.id}>{food.foodName}</li>
            ))}
          </ul>
        </div>
        <div>
          <button className="complete-button" onClick={handleComplete}>
            선택 완료
          </button>
          <button className="clear-button" onClick={handleClearSelection}>
            선택 삭제
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="food-list">
          {error ? (
            <p>Error: {error}</p>
          ) : foods.length > 0 ? (
            <ul className="ul">
              {foods.map((food) => (
                <li className="li" key={food.id}>
                  <button
                    className={`button ${
                      selectedFoods.includes(food) ? 'selected' : ''
                    }`}
                    onClick={() => handleFoodClick(food)}
                  >
                    {food.foodName}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
