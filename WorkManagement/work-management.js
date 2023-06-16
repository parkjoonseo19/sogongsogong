// 할 일 데이터 (그냥 잘 되나 확인해보려고 추가해둔거임 나중에는 실제로 데이터를 가져와서 해야함)
const todos = [
  { name: '어학연수 알아보기', deadline: '2023-06-21', priority: '6' },
];

// 페이지 로드 시 할 일 목록을 표시
window.onload = function () {
  const todoList = document.getElementById('todo-list');

  // 할 일 목록을 순회하며 HTML 요소로 변환하여 추가
  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
  });
};

// 할 일 항목을 생성하여 반환하는 함수
function createTodoItem(todo) {
  const todoItem = document.createElement('div');
  todoItem.className = 'todo-item';

  const nameSpan = document.createElement('span');
  nameSpan.textContent = todo.name;
  nameSpan.className = 'title';
  todoItem.appendChild(nameSpan);

  // 이미지 요소 추가
  const deadlineImage = document.createElement('img');
  deadlineImage.src = './deadline.png'; // 이미지 파일 경로
  deadlineImage.alt = '마감기한';
  todoItem.appendChild(deadlineImage);

  const deadlineSpan = document.createElement('span');
  deadlineSpan.textContent = todo.deadline;
  deadlineSpan.className = 'deadline';
  todoItem.appendChild(deadlineSpan);

  // 이미지 요소 추가
  const priorityImage = document.createElement('img');
  priorityImage.src = './priority.png'; // 이미지 파일 경로
  priorityImage.alt = '우선순위';
  todoItem.appendChild(priorityImage);

  const prioritySpan = document.createElement('span');
  prioritySpan.textContent = todo.priority;
  prioritySpan.className = 'priority';
  todoItem.appendChild(prioritySpan);

  const editButton = document.createElement('button');
  const editButtonImage = document.createElement('img');
  editButtonImage.src = './edit.png'; // 수정 버튼 이미지 파일 경로
  editButtonImage.alt = '수정';
  editButton.appendChild(editButtonImage);
  editButton.className = 'edit-button'; // CSS 클래스 추가
  editButton.addEventListener('click', openEditModal);
  todoItem.appendChild(editButton);

  const deleteButton = document.createElement('button');
  const deleteButtonImage = document.createElement('img');
  deleteButtonImage.src = './trash.png'; // 삭제 버튼 이미지 파일 경로
  deleteButton.alt = '삭제';
  deleteButton.appendChild(deleteButtonImage);
  deleteButton.className = 'delete-button'; // CSS 클래스 추가
  deleteButton.addEventListener('click', deleteTodoItem);
  todoItem.appendChild(deleteButton);

  return todoItem;
}

// 수정 모달을 열고 기존 할 일 데이터를 채우는 함수
function openEditModal() {
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
}

// 수정 모달을 닫는 함수
function closeEditModal() {
  const editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
}

// 할 일 항목 삭제 함수
function deleteTodoItem() {
  // 첫 번째 할 일 삭제
  todos.splice(0, 1);

  // 다른 HTML 파일로 이동
  // window.location.href = '목록작업페이지 경로 나중에 추가해주기';

  // 할 일 목록을 다시 렌더링
  renderTodoList();
}

// 할 일 목록을 다시 렌더링하는 함수
function renderTodoList() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  // 변경된 할 일 목록을 순회하며 HTML 요소로 변환하여 추가
  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
  });
}