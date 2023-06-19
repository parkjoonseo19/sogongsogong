import "./App.css"; // CSS 파일을 import하여 사용
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./register";
import Edit from "./Edit";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Card({ id, title, content, onDelete, todos }) {
  const [tasks, setTasks] = useState([]);
  const [defaultListText, setDefaultListText] = useState([]);

  useEffect(() => {
    setDefaultListText([title]);
  }, [title]);
  const [isEditingDefaultList, setIsEditingDefaultList] = useState(false);
  const [sortChange, setSortChange] = useState(false); //정렬버튼 누를때마다 데드라인 정렬부터 번갈아가면서 정렬하기 위해 만든 state
  const [sortImage, setSortImage] = useState("/image/arrange.png");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/todolist/work-list/workData"
        );
        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //
  //         const response = await fetch(
  //           "http://localhost:8000/todolist/work-list/",
  //           {
  //             headers: {
  //               Authorization: `Token ${token}`,
  //             },
  //           }
  //         );
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const data = await response.json();
  //
  //         setTodos(data);
  //       } catch (error) {
  //         console.error("Error fetching data: ", error);
  //       }
  //     };
  //
  //     fetchData();
  //   }, []);
  const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  // 중복되지 않는 랜덤 수 생성 함수(테스트용)
  function generateUniqueRandomNumber() {
    const usedNumbers = tasks.map((task) => parseInt(task.priority));
    let randomNumber = getRandomNumber();

    while (usedNumbers.includes(randomNumber)) {
      randomNumber = getRandomNumber();
    }

    return randomNumber;
  }
  // 랜덤 수 생성 함수(테스트용)
  function getRandomNumber() {
    // 원하는 수의 범위를 지정하세요 (예: 1부터 10까지)
    const min = 1;
    const max = 10;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSortTasks = () => {
    //정렬
    setTasks((prevTasks) => {
      if (sortChange) {
        return [...prevTasks].sort(
          (a, b) => Number(a.priority) - Number(b.priority)
        ); //데드라인 정렬
      } else {
        return [...prevTasks].sort((a, b) =>
          a.deadline > b.deadline ? 1 : -1
        ); //우선순위 정렬
      }
    });

    setSortChange((prevValue) => !prevValue);
    setSortImage((prevImage) => {
      return prevImage === "/image/arrange.png"
        ? "/image/darrange.png"
        : "/image/arrange.png";
    });
  };
  const handleDelete = () => {
    onDelete(id);
  };

  const handleDefaultListTextChange = (event) => {
    setDefaultListText(event.target.value);
  };

  const handleAddTask = () => {
    const year = 2023; //이거는 테스트용으로 날짜랜덤생성한거. 작업수정페이지랑 연결하면 삭제
    const month = "06";
    const day = String(Math.floor(Math.random() * 30) + 1).padStart(2, "0");
    const deadline = `${year}-${month}-${day}`; //여기까지 날짜랜덤생성

    const priority = generateUniqueRandomNumber(); //우선순위 랜덤 생성

    const newTask = {
      id: tasks.length,
      text: `작업 ${tasks.length + 1}`,
      checked: false,
      deadline: deadline,
      priority: priority.toString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log("Deadline:", deadline);
    console.log("Priority:", priority);
  };

  return (
    <div className="card">
      <ul className="task-list">
        <div id="work_head">
          <div class="ardelbtn">
            <button id="workname" onClick={() => setIsEditingDefaultList(true)}>
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

        <div id="checkbox_div">
          {tasks
            .filter((task) => !task.checked)
            .map((task) => (
              <li key={task.id}>
                <label className="checkbox-label">
                  {task.checked ? (
                    <img
                      src="/image/notfull.png"
                      alt="체크된 이미지"
                      onClick={() => handleCheckboxChange(task.id)}
                    />
                  ) : (
                    <img
                      src="/image/full2.png"
                      alt="체크박스 체크안됨"
                      onClick={() => handleCheckboxChange(task.id)}
                    />
                  )}

                  <span class="checkbox-text">{task.text}</span>
                </label>
              </li>
            ))}

          {tasks
            .filter((task) => task.checked) // 체크된 작업만 필터링
            .map((task) => (
              <li key={task.id}>
                <label className="checkbox-label_checked">
                  {task.checked ? (
                    <img
                      src="/image/notfull.png"
                      alt="체크된 이미지"
                      onClick={() => handleCheckboxChange(task.id)}
                    />
                  ) : (
                    <img
                      src="/image/full2.png"
                      alt="체크박스 체크안됨"
                      onClick={() => handleCheckboxChange(task.id)}
                    />
                  )}
                  <span className="checkbox-text_checked">{task.text}</span>
                </label>
              </li>
            ))}
          <button id="workplus" onClick={handleAddTask}>
            <img src="/image/workplus.png" alt="작업추가" />
          </button>
        </div>
      </ul>

      <p>{content}</p>
    </div>
  );
}

export default function App() {
  const [cards, setCards] = useState([{ id: 0 }]); // 초기에 기본 카드 하나를 추가

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/todolist/work-list/"
        );
        const data = await response.json();

        setTodos(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const addCard = () => {
    const newCard = { id: Date.now() }; // 새로운 카드의 id를 현재 시간으로 생성
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="app">
        <div className="header">
          <a>
            <img id="logo" src="/image/logo.png" alt="로고" />
          </a>

          <div id="user">
            <div id="user-info">username 님</div>
            <button id="logout" onClick={handleLogout}>
              <img src="/image/loggout.png" alt="로그아웃" />
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:pk" element={<Edit todos={todos} />} />
          <Route path="/" />
        </Routes>
        {todos.map((list) => (
          <Card
            key={list.pk}
            id={list.pk}
            title={list.listname}
            todos={todos}
            onDelete={deleteCard}
          />
        ))}
        <div id="listplus">
          <button onClick={addCard}>
            <img src="/image/listplus.png" alt="목록추가" />
          </button>
        </div>
      </div>
    </Router>
  );
}
