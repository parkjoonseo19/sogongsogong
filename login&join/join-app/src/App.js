import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

//확인용
const User = {
  id: 'user'
}

const ClickTryReg = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isIdAvailable, setIdAvailable] = useState(true);

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

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    if (id === User.id)
      alert('이미 사용 중인 아이디입니다.');
    else
      alert('사용 가능한 아이디입니다.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 회원가입 로직을 작성합니다.
    // axios
    //   .post('http://localhost:1337/api/auth/local/register', {
    //     userId: id,
    //     password: password,
    //   })
    //   .then(response => {  //post 후 응답을 받아온다.
    //     // Handle success.
    //     console.log('Well done!');
    //     console.log('User profile', response.data.user);
    //     console.log('User token', response.data.jwt);
    //     //localStorage.setItem('tocken', respose.data.jwt);
    //     //replace("/");  //회원가입 후 자동로그인
    //   })
    //   .catch(error => {
    //     // Handle error.
    //     console.log('An error occurred:', error.response);
    //   });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <div className="id">아이디</div>
        <input className="i1" type="text" value={id} onChange={handleIdChange} />
        <button className="double_check" type="button" onClick={handleCheckAvailability}>
          중복확인
        </button>
        <hr className="line1"></hr>
      </label>
      <br />
      <label>
        <div className="pw">비밀번호</div>
        <input className="i2" type="password" value={password} onChange={handlePasswordChange} />
        <hr className="line2"></hr>
      </label>
      <br />
      <label>
        <div className="pw2">비밀번호 확인</div>
        <input className="i3" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        <hr className="line3"></hr>
        <div className="pwError">
          {password !== confirmPassword && confirmPassword.length > 0 && (
            <div>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
      </label>
      <br />
      <button className="join" type="submit">회원가입</button>
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <header>
        <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="로고"></img>
      </header>
      <ClickTryReg />
    </div>
  );
}

export default App;
