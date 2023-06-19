import "./Edit.css";
import { Link, useParams, useNavigate } from "react-router-dom";

const Edit = ({ todos }) => {
  const navigate = useNavigate();

  let { pk } = useParams();
  pk = parseInt(pk);

  const work = todos
    .flatMap((list) => list.work_data)
    .find((work) => work.pk === pk);

  const openEditModal = () => {
    const editModal = document.getElementById("edit-modal");
    const editNameInput = document.getElementById("edit-name");
    const editDeadlineInput = document.getElementById("edit-deadline");
    const editPriorityInput = document.getElementById("edit-priority");

    editNameInput.value = work.workName;
    editDeadlineInput.value = work.workDeadline || "";
    editPriorityInput.value = work.workPriority || "";

    editModal.style.display = "block";
  };

  const closeEditModal = () => {
    const editModal = document.getElementById("edit-modal");
    editModal.style.display = "none";
  };

  const updateTodoItem = async (e) => {
    e.preventDefault();

    const editNameInput = document.getElementById("edit-name");
    const editDeadlineInput = document.getElementById("edit-deadline");
    const editPriorityInput = document.getElementById("edit-priority");

    const updatedData = {
      workName: editNameInput.value,
      workPriority: editPriorityInput.value,
      workDeadline: editDeadlineInput.value,
      completed: work.completed,
      workList: work.workList,
      user: work.user,
      pk: work.pk,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/todolist/work-list/workData/${pk}`,
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

      navigate("/"); // List로 나타낼 메인창 경로
      window.location.reload();

      closeEditModal();
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  const deleteTodoItem = async (pk) => {
    try {
      const response = await fetch(
        `http://localhost:8000/todolist/work-list/workData/${pk}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/"); // List로 나타낼 메인창 경로
      window.location.reload();
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  const todoItem = (
    <div className="todo-item">
      <span className="title">{work.workName}</span>
      <img src="/image/deadline.png" alt="마감기한" />
      <span className="deadline">{work.workDeadline}</span>
      <img src="/image/priority.png" alt="우선순위" />
      <span className="priority">{work.workPriority}</span>
      <button className="edit-button" onClick={openEditModal}>
        <img src="/image/edit.png" alt="수정" />
      </button>
      <button className="delete-button" onClick={() => deleteTodoItem(work.pk)}>
        <img src="/image/trash.png" alt="삭제" />
      </button>
    </div>
  );

  return (
    <div>
      <header>
        <Link to="/">
          <img className="arrow" src="/image/arrow.png" alt="뒤로가기" />
        </Link>
      </header>
      <main>
        <div id="todo-list">{todoItem}</div>
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
              <button type="submit" onClick={updateTodoItem}>
                수정
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Edit;
