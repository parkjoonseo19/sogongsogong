import "./Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClickTryReg = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isIdAvailable, setIdAvailable] = useState(true);

  const navigate = useNavigate();

  const handleIdChange = (event) => {
    setId(event.target.value);
    setIdAvailable(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/register/", {
        username: id,
        password: password,
      })
      .then((response) => {
        alert("회원가입에 성공했습니다.");
        navigate("/login");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else {
          alert("회원가입 요청 중 오류가 발생했습니다.");
        }
      });
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:8000/api/check_id/${id}/`)
      .then((response) => {
        if (response.data.available) {
          alert("사용 가능한 아이디입니다.");
          setIdAvailable(true);
        } else {
          alert("이미 사용 중인 아이디입니다.");
          setIdAvailable(false);
        }
      })
      .catch((error) => {
        alert("중복 확인 중 오류가 발생했습니다.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <div className="id">아이디</div>
        <input
          className="i1"
          type="text"
          value={id}
          onChange={handleIdChange}
        />
        <button
          className="double_check"
          type="button"
          onClick={handleCheckAvailability}
        >
          중복확인
        </button>
        <hr className="line1"></hr>
      </label>
      <br />
      <label>
        <div className="pw">비밀번호</div>
        <input
          className="i2"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <hr className="line2"></hr>
      </label>
      <br />
      <label>
        <div className="pw2">비밀번호 확인</div>
        <input
          className="i3"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <hr className="line3"></hr>
        <div className="pwError">
          {password !== confirmPassword && confirmPassword.length > 0 && (
            <div>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
      </label>
      <br />
      <button className="join" type="submit">
        회원가입
      </button>
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <header>
        <img src="/image/logo.png" alt="로고"></img>
      </header>
      <ClickTryReg />
    </div>
  );
}

export default App;
