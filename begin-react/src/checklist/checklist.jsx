import React, { useState, useCallback } from 'react';

const checkBoxList = ['식사 순서', '식후 액상과당 섭취', '운동 여부'];

const CheckBoxes = ({ meal, checkedList, setCheckedList }) => {
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

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(`${meal} checkedList:`, checkedList);
    },
    [checkedList, meal]
  );

  return (
    <form onSubmit={onSubmit}>
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
      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  const [breakfastCheckedList, setBreakfastCheckedList] = useState([]);
  const [lunchCheckedList, setLunchCheckedList] = useState([]);
  const [dinnerCheckedList, setDinnerCheckedList] = useState([]);

  return (
    <div>
      <div>
        <h1>2024년 7월 28일</h1>
      </div>
      <div>
        <h1>오늘의 식습관 check list</h1>
      </div>
      <div>
        <h2>아침</h2>
        <CheckBoxes
          meal="Breakfast"
          checkedList={breakfastCheckedList}
          setCheckedList={setBreakfastCheckedList}
        />
      </div>
      <div>
        <h2>점심</h2>
        <CheckBoxes
          meal="Lunch"
          checkedList={lunchCheckedList}
          setCheckedList={setLunchCheckedList}
        />
      </div>
      <div>
        <h2>저녁</h2>
        <CheckBoxes
          meal="Dinner"
          checkedList={dinnerCheckedList}
          setCheckedList={setDinnerCheckedList}
        />
      </div>
    </div>
  );
}

export default App;
