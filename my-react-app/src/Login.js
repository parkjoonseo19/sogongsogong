import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//확인용

function ClickLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 서버에 로그인 요청 보내기
    axios
      .post("http://localhost:8000/api/login/", {
        username: id,
        password: password,
      })
      .then((response) => {
        if (response.data.token) {
          // 토큰이 존재하면 로그인 성공으로 간주
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          alert("로그인에 성공했습니다.");
          navigate("/");
        } else {
          // 토큰이 없는 경우 로그인 실패로 간주
          alert("로그인에 실패했습니다.");
        }
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
        alert("로그인 요청 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <div className="id_login">아이디</div>
          <input
            className="id_input"
            type="text"
            value={id}
            onChange={handleIdChange}
          />
          <hr className="line4"></hr>
        </label>
        <br />
        <label>
          <div className="pW">비밀번호</div>
          <input
            className="pw_input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <hr className="line5"></hr>
        </label>
        <br />
        <button type="submit" className="LoginBtn">
          로그인
        </button>
      </form>
    </div>
  );
}

function ClickReg() {
  return (
    <p>
      <div className="register">Todoto가 처음이신가요?</div>{" "}
      <a className="goRegister" href="/register">
        회원가입
      </a>
    </p>
  );
}

function Logo() {
  return (
    <header className="Login-header">
      <img src="/image/logo.png" alt="로고"></img>
    </header>
  );
}

function Login() {
  return (
    <div className="Login">
      <Logo />
      <ClickLogin />
      <ClickReg />
    </div>
  );
}

export default Login;
