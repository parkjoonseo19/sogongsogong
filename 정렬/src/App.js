import React, { useState } from 'react';
import './App.css';
function Card({ id, title, content, onDelete }) {

  const [tasks, setTasks] = useState([
    { id: 0, text: '작업 1', checked: false, deadline: '2023-06-30', priority: '2' },
    { id: 1, text: '작업 2', checked: true, deadline: '2023-06-25', priority: '1' },
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

  const handleAddTask = () => {
    const year = 2023; //이거는 테스트용으로 날짜랜덤생성한거. 작업수정페이지랑 연결하면 삭제
    const month = '06';
    const day = String(Math.floor(Math.random() * 30) + 1).padStart(2, '0');
    const deadline = `${year}-${month}-${day}`; //여기까지 날짜랜덤생성

    const priority = generateUniqueRandomNumber(); //우선순위 랜덤 생성

    const newTask = {
      id: tasks.length,
      text: `작업 ${tasks.length + 1}`,
      checked: false,
      deadline: deadline,
      priority: priority.toString()
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log("Deadline:", deadline);
    console.log("Priority:", priority);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleDefaultListTextChange = (event) => {
    setDefaultListText(event.target.value);
  };

  const [sortChange, setSortChange] = useState(false); //정렬버튼 누를때마다 데드라인 정렬부터 번갈아가면서 정렬하기 위해 만든 state
  const handleSortTasks = () => {  //정렬
    setTasks((prevTasks) => {
      if (sortChange) {
        return [...prevTasks].sort((a, b) => Number(a.priority) - Number(b.priority)); //데드라인 정렬
      } else {
        return [...prevTasks].sort((a, b) => (a.deadline > b.deadline ? 1 : -1));  //우선순위 정렬
      }
    });

    setSortChange((prevValue) => !prevValue);
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
              <button class="arrangebtn" onClick={handleSortTasks}>
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
            <img src="/img/workplus.png" alt="작업추가" />
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
