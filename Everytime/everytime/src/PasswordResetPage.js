//PasswordResetPage.js
import React, { useState } from 'react';
import './css/PasswordResetPage.css'; // 비밀번호 찾기 페이지 전용 CSS 파일
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트

function PasswordResetPage() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate(); // 네비게이션 함수 사용

  const handlePasswordReset = async () => {
    try {
      // 백엔드로 이메일을 전송하여 비밀번호 재설정 요청
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/users/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // 요청 성공 후 두 번째 화면으로 이동
      //if (data.success) {
      // 이메일이 가입되어 있을 경우
      // alert('임시 비밀번호가 이메일로 전송되었습니다.');
      if (data.success) {
      navigate('/password-reset-confirm'); // 비밀번호 재설정 성공 화면으로 리다이렉트
      } else {
        // 가입되어 있지 않은 이메일일 경우
        alert('가입되어 있지 않은 이메일입니다.');
      }
    } catch (error) {
      // 네트워크 에러나 기타 예외 처리
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
      console.error('Password reset error:', error);
    }
  };

  return (
    <div className="password-reset-container">
      <div className="title-container">
        <h1>Everytime</h1>
        <p>for Foreign</p>
      </div>
      <div className="content">
        <h3>학교 이메일을 통해서 회원가입을 하실 수 있습니다</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="가입된 학교 이메일"
          className="email-input"
        />
        <button
          onClick={handlePasswordReset}
          className="reset-button"  
        >
          비밀번호 찾기
        </button>
      </div>
      <div className="footer">
      <span className="footer-text">
        ※만약 이메일이 오지 않았을 경우 스팸 편지함을 확인해주세요.
      </span>
      </div>
      <span className="footer-text">
        ※가입된 아이디가 있을 경우, 입력하신 이메일로 비밀번호를 안내해드립니다.
      </span>
    </div>
  ); 
}

export default PasswordResetPage;