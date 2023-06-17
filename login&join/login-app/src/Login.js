import './Login.css';
import React, { useState } from 'react';

//확인용
const User = {
  id: 'user',
  pw: 'password'
}

function ClickLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리
    if (id === User.id && password === User.pw)
      alert('로그인에 성공했습니다.');
    else
      alert('등록되지 않은 회원입니다.');

    console.log('Id:', id);
    console.log('Password:', password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <div className="id">아이디</div>
          <input className="id_input" type="text" value={id} onChange={handleIdChange} />
          <hr className="line1"></hr>
        </label>
        <br />
        <label>
          <div className="pw">비밀번호</div>
          <input className="pw_input" type="password" value={password} onChange={handlePasswordChange} />
          <hr className="line2"></hr>
        </label>
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

function ClickReg() {
  return (
    <p>
      <div className="join">Todoto가 처음이신가요?</div> <a clasName="회원가입" href="/join">회원가입</a>
    </p>
  )
}

function Logo() {
  return (
    <header className="Login-header">
      <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="로고"></img>
    </header>
  )
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
