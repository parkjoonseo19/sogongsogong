//css (버튼 포함), 글씨체
//기술적인 부분 로그아웃, 로그인시 이름 뜨게, 정렬, 마감일도

import React, { useState } from 'react';
import './style.css';
function Card({ id, title, content, onDelete }) {
  const [tasks, setTasks] = useState([
    { id: 0, text: '작업 1', checked: false },
    { id: 1, text: '작업 2', checked: true },
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
        <button class="arrangebtn">
          <img src="/img/arrange.png" alt="정렬" />
        </button>
        <button class="deletebtn" onClick={handleDelete}>
          <img src="/img/delete.png" alt="삭제" />
        </button>
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
        <button onClick={handleAddTask}>
          <img src="/img/workplus.png" alt="작업추가" />
        </button>
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
      <h1>
        <a href="">
          <img src="/img/logo.png" alt="로고" />
        </a>
      </h1>
      <div className="user-info">username님</div>
      <button>
        <img src="/img/logout.png" alt="로그아웃" />
      </button>
      {cards.map((card) => (
        <Card key={card.id} id={card.id} onDelete={deleteCard} />
      ))}
      <button onClick={addCard}>
        <img src="/img/listplus.png" alt="목록추가" />
      </button>
    </div>
  );
}
