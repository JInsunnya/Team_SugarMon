import React, { useState, useEffect } from 'react';
import SugarmonLogo1 from './Logo.png';
import './foodpick.css';
import axios from 'axios';

function Pick1() {
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [completedFoods, setCompletedFoods] = useState([]);
  const [error, setError] = useState(null);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NzQzNDEzLCJpYXQiOjE3MjIxNTE0MTMsImp0aSI6IjdkMTlmMzVhMzQ1ZDQzZjVhOGQ0MGZhN2IzN2VjNDMwIiwidXNlcl9pZCI6MX0.2s9VjKiwwxYMUM5c9v71HhQNIVPUR4OSRqumZZkNgOI';

  const apiCall = axios.create({
    baseURL: 'https://sugarmon.store/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await apiCall.get(`/gIndex/getFood`);
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
  }, []);

  useEffect(() => {
    const savedCompletedFoods =
      JSON.parse(localStorage.getItem('completedFoods')) || [];
    setCompletedFoods(savedCompletedFoods);
  }, []);

  useEffect(() => {
    localStorage.setItem('completedFoods', JSON.stringify(completedFoods));
  }, [completedFoods]);

  const handleFoodClick = (food) => {
    if (selectedFoods.includes(food)) {
      setSelectedFoods(selectedFoods.filter((f) => f !== food));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const handleComplete = async () => {
    try {
      const when = 1;
      const ateDate = new Date().toISOString().split('T')[0];

      const foodsToRegister = selectedFoods.map((food) => ({
        name: food.foodName,
        ateDate: ateDate,
        when: when,
      }));

      await apiCall.post(`/ateFood/registerAteFood`, foodsToRegister);

      let totalGI = 0;

      for (const food of selectedFoods) {
        try {
          const response = await apiCall.get(`/gIndex/getGI/${food.foodName}`);
          const giData = response.data;

          const giToRegister = {
            foodName: food.foodName,
            gIndex: giData.gIndex,
          };

          await apiCall.post(`/gIndex/registerGI`, giToRegister);

          totalGI += giData.gIndex;
        } catch (error) {
          console.error(
            `Error registering GI for ${food.foodName}:`,
            error.response ? error.response.data : error.message
          );
        }
      }

      console.log(`Total GI of selected foods: ${totalGI}`);

      setCompletedFoods([...completedFoods, ...selectedFoods]);
      setSelectedFoods([]);
    } catch (error) {
      console.error('Error registering foods:', error);
      setError(error.message);
    }
  };

  const handleClearSelection = async () => {
    try {
      const updatedCompletedFoods = completedFoods.filter(
        (food) => !selectedFoods.includes(food)
      );

      setCompletedFoods(updatedCompletedFoods);
      localStorage.setItem(
        'completedFoods',
        JSON.stringify(updatedCompletedFoods)
      );

      setSelectedFoods([]);
    } catch (error) {
      console.error('Error clearing selection:', error);
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

export default Pick1;
