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
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8000/todolist/work-list/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        d;
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:pk" element={<Edit todos={todos} />} />
        <Route path="/" element={<List todos={todos} />} />
      </Routes>
    </Router>
  );
};

const List = ({ todos }) => {
  return (
    <div>
      <h2>todolist</h2>
      {todos.map((list, index) => (
        <div key={index}>
          <h3>{list.listname}</h3>

          {list.work_data.map((work) => (
            <div key={work.pk}>
              <Link to={`/edit/${work.pk}`}>{work.workName}</Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
