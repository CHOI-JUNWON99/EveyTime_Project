import React, { useState } from 'react';
import './LoginForm.css'; // 스타일 시트 임포트

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="title-container">
        <h1 className="title">Everytime</h1>
        <p className="subtitle">for Foreign</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form"> 
        <input
          type="email"
          className="login-input"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          에브리타임 로그인
        </button>
      </form>
      <div className="links-container">
       <a href="/signup" className="auth-link">회원가입</a>
       <a href="/forgot-password" className="auth-link">비밀번호 찾기</a>
      </div>
      <div className="footer">
        <span className="footer-text">
          By clicking continue, you agree to our Terms of Service and Privacy Policy
        </span>
      </div>
      <div className="footer-links">
        <a href="/inquiry" className="auth-link">문의하기</a>
        <a href="/privacy-policy" className="auth-link">개인정보 처리방침</a>
        <a href="/terms-and-conditions" className="auth-link">이용약관</a>
      </div>
    </div>
  );
}

export default LoginForm;
