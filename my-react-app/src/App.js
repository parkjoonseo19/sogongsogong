import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./register";
import Edit from "./Edit";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Card({ id, content, todos }) {
  const [cards, setCards] = useState([{ id: 0, todos: [] }]); // 초기에 기본 카드 하나를 추가

  const [defaultListText, setDefaultListText] = useState([]);

  useEffect(() => {
    const parsedTodos = JSON.parse(todos);
    setDefaultListText(parsedTodos);
  }, [todos]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const parsedContent = JSON.parse(content);
    setTasks(parsedContent);
  }, [content]);

  const [isEditingDefaultList, setIsEditingDefaultList] = useState(false);
  const [sortChange, setSortChange] = useState(false); //정렬버튼 누를때마다 데드라인 정렬부터 번갈아가면서 정렬하기 위해 만든 state
  const [sortImage, setSortImage] = useState("/image/arrange.png");

  // 작업 체크하면 db에 적용되도록
  const handleCheckboxChange = (taskPK) => {
    const updatedTasks = tasks.map((task) =>
      task.pk === taskPK ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find((task) => task.pk === taskPK);
    if (updatedTask) {
      updateTodoItem(updatedTask);
    }
  };

  const updateTodoItem = async (task) => {
    const updatedData = {
      workName: task.workName,
      workPriority: task.workPriority,
      workDeadline: task.workDeadline,
      completed: true,
      workList: task.workList,
      user: task.user,
      pk: task.pk,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/todolist/work-list/workData/${task.pk}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating data: ", error);
    }
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

  // 목록 삭제
  const handleDelete = async (pk) => {
    try {
      const response = await fetch(
        `http://localhost:8000/todolist/work-list/${pk}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  // 목록명 바꾸는 함수 (db저장)
  const handleDefaultListTextChange = async (event, pk) => {
    const newListname = event.target.value;
    setDefaultListText([{ defaultListText, listname: newListname }]);
    console.log(pk);

    try {
      const response = await fetch(
        `http://localhost:8000/todolist/work-list/${pk}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listname: newListname,
            work_data: defaultListText.work_data,
            user: defaultListText.user,
            pk: defaultListText.pk,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  // 작업 생성
  const handleAddTask = async (pk) => {
    // 날짜 랜덤 생성
    const year = 2023;
    const month = "06";
    const day = String(Math.floor(Math.random() * 30) + 1).padStart(2, "0");
    const deadline = `${year}-${month}-${day}`;

    const priority = generateUniqueRandomNumber();
    const existingTasks = await fetchExistingTasks();
    const newPK = generateUniquePK(existingTasks);

    const newTask = {
      workName: "기본 작업",
      workPriority: priority,
      workDeadline: deadline,
      completed: false,
      workList: pk,
      user: 1,
      pk: newPK,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/todolist/work-list/workData/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setTasks((prevTasks) => [...prevTasks, data]);
        window.location.reload();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  // 기존 작업 목록 가져오기
  async function fetchExistingTasks() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/todolist/work-list/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch existing tasks");
      }
    } catch (error) {
      console.error("Error fetching existing tasks: ", error);
      return [];
    }
  }

  // 고유한 pk 생성 함수
  function generateUniquePK(existingTasks) {
    const existingPKs = existingTasks.map((task) => task.pk);
    let newPK = getRandomNumber();

    while (existingPKs.includes(newPK)) {
      newPK = getRandomNumber();
    }
    return newPK;
  }

  function getRandomNumber() {
    const min = 1;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 로그아웃.
  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post("http://localhost:8000/api/logout/", null, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.location.href = "/login";
    }
  };

  const addCard = () => {
    const priority = generateUniqueRandomNumber();
    const existingLists = fetchExistingLists();
    const newListPK = generateUniquePKList(existingLists);
    const token = localStorage.getItem("token");

    const newCard = {
      listname: "기본 목록",
      user: 1,
      pk: newListPK,
    };

    try {
      const response = fetch("http://localhost:8000/todolist/work-list/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newCard),
      });

      console.log(newCard);
      if (response.ok) {
        const newCard = response.json();
        setCards((prevCards) => [...prevCards, newCard]);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error adding task: ", error);
    }
    window.location.reload();
  };

  // 기존 작업 목록 가져오기
  async function fetchExistingLists() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/todolist/work-list/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch existing tasks");
      }
    } catch (error) {
      console.error("Error fetching existing tasks: ", error);
      return [];
    }
  }

  function generateUniquePKList(existingLists) {
    if (!Array.isArray(existingLists)) {
      existingLists = [];
    }

    const existingPKs = existingLists.map((task) => task.pk);
    let newPK = getRandomNumber();

    while (existingPKs.includes(newPK)) {
      newPK = getRandomNumber();
    }
    return newPK;
  }

  return (
    <div className="app">
      <div className="header">
        <a>
          <img id="logo" src="/image/logo.png" alt="로고" />
        </a>

        <div id="user">
          <div id="user-info">{localStorage.getItem("username")} 님</div>
          <button id="logout" onClick={handleLogout}>
            <img src="/image/loggout.png" alt="로그아웃" />
          </button>
        </div>
      </div>
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
                    value={defaultListText.listname}
                    onChange={(event) =>
                      handleDefaultListTextChange(event, defaultListText.pk)
                    }
                    onBlur={() => setIsEditingDefaultList(false)}
                  />
                ) : (
                  defaultListText.listname
                )}
              </button>
            </div>
            <div class="ardelbtn">
              <button class="arrangebtn" onClick={handleSortTasks}>
                <img src={sortImage} alt="정렬" />
              </button>
            </div>
            <div class="ardelbtn">
              <button
                class="deletebtn"
                onClick={() => handleDelete(defaultListText.pk)}
              >
                <img src="/image/delete.png" alt="삭제" />
              </button>
            </div>
          </div>

          <div id="checkbox_div">
            {tasks
              .filter((task) => !task.completed) // 완료 안된 작업
              .map((task) => (
                <li key={task.pk}>
                  <label className="checkbox-label">
                    {task.completed ? (
                      <img
                        src="/image/notfull.png"
                        alt="체크된 이미지"
                        onClick={() => handleCheckboxChange(task.pk)}
                      />
                    ) : (
                      <img
                        src="/image/full2.png"
                        alt="체크박스 체크안됨"
                        onClick={() => handleCheckboxChange(task.pk)}
                      />
                    )}

                    <span class="checkbox-text">
                      {" "}
                      <Link to={`/edit/${task.pk}`}>{task.workName}</Link>
                    </span>
                  </label>
                </li>
              ))}

            {tasks
              .filter((task) => task.completed) // 체크된 작업만 필터링
              .map((task) => (
                <li key={task.id}>
                  <label className="checkbox-label_checked">
                    {task.completed ? (
                      <img
                        src="/image/notfull.png"
                        alt="체크된 이미지"
                        onClick={() => handleCheckboxChange(task.pk)}
                      />
                    ) : (
                      <img
                        src="/image/full2.png"
                        alt="체크박스 체크안됨"
                        onClick={() => handleCheckboxChange(task.pk)}
                      />
                    )}
                    <span className="checkbox-text_checked">
                      <Link to={`/edit/${task.pk}`}>{task.workName}</Link>
                    </span>
                  </label>
                </li>
              ))}

            <button
              id="workplus"
              onClick={() => handleAddTask(defaultListText.pk)}
            >
              <img src="/image/workplus.png" alt="작업추가" />
            </button>
          </div>
        </ul>
      </div>
      <div id="listplus">
        <button onClick={addCard}>
          <img src="/image/listplus.png" alt="목록추가" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/todolist/work-list/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 이상하게 .. 로딩이 안뜨고 새로고침해야 뜨네요 ㅠㅠ
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const addCard = () => {
    const newCard = { id: Date.now() }; // 새로운 카드의 id를 현재 시간으로 생성
    setTodos((prevCards) => [...prevCards, newCard]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:pk" element={<Edit todos={todos} />} />
        <Route
          path="/"
          element={todos.map((list) => (
            <Card
              key={list.pk}
              id={list.pk}
              todos={JSON.stringify(list)}
              content={JSON.stringify(list.work_data)}
            />
          ))}
        />
      </Routes>
    </Router>
  );
}
