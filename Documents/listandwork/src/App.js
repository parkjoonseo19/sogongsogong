//css (버튼 포함), 글씨체
//기술적인 부분 로그아웃, 로그인시 이름 뜨게, 정렬, 마감일도

import React, { useState } from 'react';
import './style.css';
function Card({ id, title, content, onDelete }) {
  const [tasks, setTasks] = useState([
    { id: 0, text: '작업 1', checked: false, deadline: '2023-06-30', priority: '1' },
    { id: 1, text: '작업 2', checked: true,deadline: '2023-06-30', priority: '1' },
  ]);

  const [defaultListText, setDefaultListText] = useState('기본목록');
  const [isEditingDefaultList, setIsEditingDefaultList] = useState(false);

  const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length,
      text: `작업 ${tasks.length + 1}`,
      checked: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleDefaultListTextChange = (event) => {
    setDefaultListText(event.target.value);
  };

  return (
    <div className="card">
      <ul className="task-list">
        <div id="workname_btn">
          <div id="workname">
            <div onClick={() => setIsEditingDefaultList(true)}>
              {isEditingDefaultList ? (
                <input
                  type="text"
                  value={defaultListText}
                  onChange={handleDefaultListTextChange}
                  onBlur={() => setIsEditingDefaultList(false)}
                />
              ) : (
                defaultListText
              )}

            </div>
            <div>
              <button class="arrangebtn">
                <img src="/img/arrange.png" alt="정렬" />
              </button>
            </div>
            <div>
              <button class="deletebtn" onClick={handleDelete}>
                <img src="/img/delete.png" alt="삭제" />
              </button>
            </div>
          </div>
        </div>

        <div id="checkbox_div">
          {tasks.map((task) => (
            <li key={task.id}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                {task.text}
                <span className="checkbox-custom"></span>
              </label>
            </li>
          ))}
        
          <button id="workplus" onClick={handleAddTask}>
            <img  src="/img/workplus.png" alt="작업추가" />
          </button>
        </div>
      </ul>

      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default function App() {
  const [cards, setCards] = useState([{ id: 0 }]); // 초기에 기본 카드 하나를 추가

  const addCard = () => {
    const newCard = { id: Date.now() }; // 새로운 카드의 id를 현재 시간으로 생성
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <div className="app">
      
      <div class="header">
        <a href="" >
          <img id="logo" src="/img/logo.png" alt="로고" />
        </a>
        
        <div id="user">
          <div id="user-info" >username  님</div>
          <button id="logout">
            <img src="/img/loggout.png" alt="로그아웃" />
          </button>
        </div>
      </div>
      
      {cards.map((card) => (
        <Card key={card.id} id={card.id} onDelete={deleteCard} />
      ))}
      <div id="listplus">
        <button onClick={addCard}>
          <img src="/img/listplus.png" alt="목록추가" />
        </button>
      </div>
    </div>
  );
}
