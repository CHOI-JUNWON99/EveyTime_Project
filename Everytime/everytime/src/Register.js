import React, { useState } from 'react';
import './css/RegisterForm.css'; // Make sure the CSS path is correct

function RegisterForm({ onLogin }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pw !== pwConfirm) {
      setError('비밀번호를 재확인 해주세요');
      return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@]{8,}$/.test(pw)) {
      setError('비밀번호 격식을 지켜야 합니다 (영어+숫자, 특수문자: !,@)');
      return;
    }

    const postData = {
      id,
      password: pw,
      email,
      organization: organizationId
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      if (data.status === 0) {
        onLogin(); // Handle successful registration
      } else {
        setError(data.error_msg); // Display error message from the API
      }
    } catch (error) {
      setError('서버와의 연결에 실패했습니다.');
    }
  };

  return (
    <div className="register-container">
      <div className="title-container">
        <h1 className="title">Everytime</h1>
        <p className="subtitle">for Foreign</p>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          className="register-input"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="비밀번호 재확인"
          value={pwConfirm}
          onChange={(e) => setPwConfirm(e.target.value)}
          required
        />
        <input
          type="name"
          className="register-input"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          className="register-input"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="register-input"
          placeholder="소속 학교/단체 ID"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          required
        />
        <button type="submit" className="register-button">회원가입 완료!</button>
        {error && <div className="error-message">{error}</div>}
      </form>
      <div className="footer-links">
        <a href="/inquiry" className="auth-link">문의하기</a>
        <a href="/privacy-policy" className="auth-link">개인정보 처리방침</a>
        <a href="/terms-and-conditions" className="auth-link">이용약관</a>
      </div>
    </div>
  );
}

export default RegisterForm;
