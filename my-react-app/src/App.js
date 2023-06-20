import "./App.css"; // CSS 파일을 import하여 사용
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./register";
import Edit from "./Edit";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Card({ id, title, content, onDelete, todos }) {
  const [defaultListText, setDefaultListText] = useState([]);
  const [isEditingDefaultList, setIsEditingDefaultList] = useState(false);
  const [sortChange, setSortChange] = useState(false);
  const [sortImage, setSortImage] = useState("/image/arrange.png");

  const handleDefaultListTextChange = (event) => {
    setDefaultListText(event.target.value);
  };

  const handleAddTask = () => {
    const year = 2023;
    const month = "06";
    const day = String(Math.floor(Math.random() * 30) + 1).padStart(2, "0");
    const deadline = `${year}-${month}-${day}`;

    const priority = generateUniqueRandomNumber();

    const newTask = {
      id: todos.length,
      text: `작업 ${todos.length + 1}`,
      checked: false,
      deadline: deadline,
      priority: priority.toString(),
    };

    todos.push(newTask); // 카드에 새로운 테스크 추가

    setDefaultListText([...defaultListText]); // 상태 업데이트
  };

  const handleSortTasks = () => {
    // 정렬 로직
    todos.sort((a, b) => {
      if (sortChange) {
        return Number(a.priority) - Number(b.priority);
      } else {
        return a.deadline > b.deadline ? 1 : -1;
      }
    });

    setSortChange(!sortChange); // 정렬 상태 업데이트

    setSortImage((prevImage) => {
      return prevImage === "/image/arrange.png"
        ? "/image/darrange.png"
        : "/image/arrange.png";
    });
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="card">
      <ul className="task-list">
        <div id="work_head">
          <div class="ardelbtn">
            <button
              id="workname"
              onClick={() => setIsEditingDefaultList(true)}
            >
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
            </button>
          </div>
          <div class="ardelbtn">
            <button class="arrangebtn" onClick={handleSortTasks}>
              <img src={sortImage} alt="정렬" />
            </button>
          </div>
          <div class="ardelbtn">
            <button class="deletebtn" onClick={handleDelete}>
              <img src="/image/delete.png" alt="삭제" />
            </button>
          </div>
        </div>
        <h2>{content}</h2>
        <div id="checkbox_div">
          {todos
            .filter((task) => !task.completed)
            .map((task) => (
              <li key={task.pk}>
                <label className="checkbox-label">
                  {task.completed ? (
                    <img
                      className="checkbox"
                      src="/image/checkbox_checked.png"
                      alt="체크박스"
                    />
                  ) : (
                    <img
                      className="checkbox"
                      src="/image/checkbox_unchecked.png"
                      alt="체크박스"
                    />
                  )}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task)}
                  />
                  {task.text}
                </label>
              </li>
            ))}
        </div>
        <div id="add_task_div">
          <button id="add_task_btn" onClick={handleAddTask}>
            <img src="/image/add_task.png" alt="작업 추가" />
          </button>
        </div>
      </ul>
    </div>
  );
}

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // 초기 카드 설정
    const initialCards = [
      {
        id: 0,
        title: "카드 1",
        content: "카드 1 내용",
        todos: [],
      },
      {
        id: 1,
        title: "카드 2",
        content: "카드 2 내용",
        todos: [],
      },
    ];
    setCards(initialCards);
  }, []);

  const addCard = () => {
    const newCard = {
      id: cards.length,
      title: `카드 ${cards.length + 1}`,
      content: `카드 ${cards.length + 1} 내용`,
      todos: [], // 새로운 카드에 빈 테스크 목록 설정
    };

    setCards([...cards, newCard]);
  };

  const deleteCard = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/edit">Edit</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>

        <button onClick={addCard}>카드 추가</button>

        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
            todos={card.todos} // 각 카드에 해당하는 테스크 목록 전달
            onDelete={deleteCard}
          />
        ))}
      </div>
    </Router>
  );
}

export default App;
