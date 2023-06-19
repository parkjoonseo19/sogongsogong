import "./App.css"; // CSS 파일을 import하여 사용
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./register";
import Edit from "./Edit";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:pk" element={<Edit todos={todos} />} />
        <Route
          path="/"
          element={<List todos={todos} onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
};

const List = ({ todos, onLogout }) => {
  return (
    <div className="app">
      <div class="header">
        <a href="">
          <img id="logo" src="/image/logo.png" alt="로고" />
        </a>

        <div id="user">
          <div id="user-info">username 님</div>
          <button id="logout" onClick={onLogout}>
            <img src="/image/loggout.png" alt="로그아웃" />
          </button>
        </div>
      </div>

      {todos.map((list, index) => (
        <div className="card" key={index}>
          <ul className="task-list">
            <div id="work_head">
              <div id="work_head">
                <div class="ardelbtn">
                  <button id="workname">{list.listname}</button>
                </div>
              </div>
              <div class="ardelbtn">
                <button class="arrangebtn">
                  <img src="/image/arrange.png" alt="정렬" />
                </button>
              </div>
              <div class="ardelbtn">
                <button class="deletebtn">
                  <img src="/image/delete.png" alt="삭제" />
                </button>
              </div>
            </div>
            <div id="checkbox_div">
              {list.work_data.map((work) => (
                <li key={work.pk}>
                  <Link to={`/edit/${work.pk}`}>{work.workName}</Link>
                  <div id="checkbox_div">
                    {todos
                      .filter((item) => item.pk === work.pk)
                      .map((item) => (
                        <li key={item.pk}>
                          <label className="checkbox-label_checked">
                            {item.completed ? (
                              <img
                                src="/image/notfull.png"
                                alt="체크된 이미지"
                              />
                            ) : (
                              <img
                                src="/image/full2.png"
                                alt="체크박스 체크안됨"
                              />
                            )}
                            <span className="checkbox-text">
                              {item.workName}
                            </span>
                          </label>
                        </li>
                      ))}
                    <div id="listplus">
                      <button>
                        <img src="/image/listplus.png" alt="목록추가" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
