
//기술적인 부분 로그아웃, 로그인시 이름 뜨게, 정렬, 마감일도

import React, { useState } from 'react';
import './style.css';
function Card({ id, title, content, onDelete }) {
  const [tasks, setTasks] = useState([
    { id: 0, text: '작업 1', checked: false, deadline: '2023-06-30', priority: '1' },
    //deadline: (오늘날짜, 오늘 다음 날짜)로 수정하면 빨간색으로 뜸 
    { id: 1, text: '작업 2', checked: true,deadline: '2023-06-01', priority: '2' },
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
  function isWithin24Hours2(deadline) {
    const currentDate = new Date(); // 현재 날짜와 시간
    const taskDeadline = new Date(deadline); // 작업의 마감 날짜와 시간

    // 현재 날짜와 작업 날짜의 시간 간격을 계산합니다
    const timeDiff = taskDeadline.getTime() - currentDate.getTime();
    const diffInDays = timeDiff / (1000 * 60 * 60 * 24); // 밀리초 단위를 일 단위로 변환합니다

    // 마감 기한이 2일 이상 남은 경우 검은색으로 처리합니다
    if (diffInDays > 2) {
      return 'black-text';
    }

    // 마감 기한을 넘긴 경우 검정색으로 처리합니다
    if (diffInDays < 0) {
      return 'gray-text';
    }
    return 'red-text';
  }

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

  const [sortChange, setSortChange] = useState(false); //정렬버튼 누를때마다 데드라인 정렬부터 번갈아가면서 정렬하기 위해 만든 state
  const [sortImage,setSortImage]=useState("/img/arrange.png");
  const handleSortTasks = () => {  //정렬
    setTasks((prevTasks) => {
      if (sortChange) {
        return [...prevTasks].sort((a, b) => Number(a.priority) - Number(b.priority)); //데드라인 정렬
      } else {
        return [...prevTasks].sort((a, b) => (a.deadline > b.deadline ? 1 : -1));  //우선순위 정렬
      }
    });

    setSortChange((prevValue) => !prevValue);
    setSortImage((prevImage)=>{
      return prevImage ==="/img/arrange.png"?"/img/darrange.png":"/img/arrange.png";
    });
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
                <img src="/img/delete.png" alt="삭제" />
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
                        src="/img/notfull.png"
                        alt="체크된 이미지"
                        onClick={() => handleCheckboxChange(task.id)}
                      />
                    ) : (
                      <img
                        src="/img/full2.png"
                        alt="체크박스 체크안됨"
                        onClick={() => handleCheckboxChange(task.id)}
                      />
                    )}
                  
                  <span  className={
                      isWithin24Hours2(task.deadline)
                    }>{task.text}</span>
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
                        src="/img/notfull.png"
                        alt="체크된 이미지"
                        onClick={() => handleCheckboxChange(task.id)}
                      />
                    ) : (
                      <img
                        src="/img/full2.png"
                        alt="체크박스 체크안됨"
                        onClick={() => handleCheckboxChange(task.id)}
                      />
                      
                    )}
                    <span className="checkbox-text_checked">{task.text}</span>
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
