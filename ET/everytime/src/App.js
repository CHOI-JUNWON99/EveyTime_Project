// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import PasswordResetPage from './PasswordResetPage';
import PasswordResetConfirmationPage from './PasswordResetConfirmationPage'; // 두 번째 비밀번호 찾기 화면 컴포넌트
import Register from './Register';
import ConfirmEmail from './ConfirmEmail';
import Authentication from './Authentication';
function App() {
  const handleLogin = (email, password) => {
    // TODO: 여기에 로그인 처리 로직 구현
    console.log('Login attempt:', email, password);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        {/* 루트 경로를 로그인 페이지로 리다이렉트 */}
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/PasswordResetPage" element={<PasswordResetPage />} />
        <Route path="/PasswordResetConfirmationPage" element={<PasswordResetConfirmationPage />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/ConfirmEmail" element={<ConfirmEmail />} />
        <Route path="/Authentication" element={<Authentication />} />
        {/* 추가 라우트 여기에 정의*/}
      </Routes>
    </Router>
  );
}

export default App;