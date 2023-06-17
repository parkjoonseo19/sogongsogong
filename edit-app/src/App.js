import React, { useState } from 'react';
import './App.css'; // CSS 파일을 import하여 사용

function App() {
  const [todos] = useState([
    { name: '어학연수 알아보기', deadline: '2023-06-21', priority: '6' },
  ]);

  const openEditModal = () => {
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editNameInput = document.getElementById('edit-name');
    const editDeadlineInput = document.getElementById('edit-deadline');
    const editPriorityInput = document.getElementById('edit-priority');

    const todo = todos[0]; // 첫 번째 할 일 데이터 가져오기

    // 기존 할 일 데이터를 모달 내의 입력 필드에 채움
    editNameInput.value = todo.name;
    editDeadlineInput.value = todo.deadline || '';
    editPriorityInput.value = todo.priority || '';

    // 수정 폼 제출 시 처리
    editForm.onsubmit = function (event) {
      event.preventDefault();

      // 사용자가 입력한 값으로 할 일 수정
      const newName = editNameInput.value;
      const newDeadline = editDeadlineInput.value !== '' ? editDeadlineInput.value : todo.deadline;
      const newPriority = editPriorityInput.value !== '' ? editPriorityInput.value : todo.priority;

      todos[0].name = newName; // 첫 번째 할 일 데이터 수정
      todos[0].deadline = newDeadline;
      todos[0].priority = newPriority;

      // 모달을 닫고 할 일 목록을 다시 렌더링
      closeEditModal();
      renderTodoList();
    };

    // 모달 닫기
    editModal.style.display = 'block';
  };

  const closeEditModal = () => {
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'none';
  };

  const deleteTodoItem = () => {
    // 첫 번째 할 일 삭제
    todos.splice(0, 1);
    renderTodoList();

    //여기에 나중에 db에서 데이터 삭제하고 페이지로 목록 작업 페이지로 넘어가게
  };

  const renderTodoList = () => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    // 변경된 할 일 목록을 순회하며 HTML 요소로 변환하여 추가
    todos.forEach((todo) => {
      const todoItem = createTodoItem(todo);
      todoList.appendChild(todoItem);
    });
  };


  const createTodoItem = (todo) => {
    return (
      <div className="todo-item">
        <span className="title">{todo.name}</span>
        <img src="./image/deadline.png" alt="마감기한" />
        <span className="deadline">{todo.deadline}</span>
        <img src="./image/priority.png" alt="우선순위" />
        <span className="priority">{todo.priority}</span>
        <button className="edit-button" onClick={openEditModal}>
          <img src="./image/edit.png" alt="수정" />
        </button>
        <button className="delete-button" onClick={deleteTodoItem}>
          <img src="./image/trash.png" alt="삭제" />
        </button>
      </div>
    );
  };




  return (
    <div>
      <header>
        <a href="?">
          <img className="arrow" src="./image/arrow.png" alt="뒤로가기" />
        </a>
      </header>

      <main>
        <div id="todo-list">{todos.map((todo, index) => createTodoItem(todo, index))}</div>

        <div id="edit-modal" className="modal">
          <div className="modal-content">
            <p>작업 수정</p>
            <form id="edit-form">
              <label htmlFor="edit-name">작업명:</label>
              <input type="text" id="edit-name" required />

              <label htmlFor="edit-deadline">마감일:</label>
              <input type="date" id="edit-deadline" />

              <label htmlFor="edit-priority">우선순위:</label>
              <input type="number" id="edit-priority" />

              <button type="submit">수정</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
