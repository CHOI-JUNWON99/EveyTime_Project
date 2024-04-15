// PasswordResetConfirmationPage.js
import React from 'react';
import './css/PasswordResetConfirmationPage.css'; // 적절한 CSS 스타일링
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트

function PasswordResetConfirmationPage() {
  // 비밀번호 찾기 확인 메시지 등을 표시
  const navigate = useNavigate(); // 네비게이션 함수 사용

  // 로그인 페이지로 돌아가는 함수
  const handleGoBackToLogin = () => {
    navigate('/login'); // 로그인 경로로 이동
  };

  return (
    <div className="password-reset-container">
      <div className="title-container">
        <h1>Everytime</h1>
        <p>for Foreign</p>
      </div>
      <div className="content">
        <h4>
            가입된 학교 이메일로 임시 비밀번호를 발송했습니다.
        </h4>
        <h5>
            로그인 후 비밀번호를 새로 등록해주세요!
        </h5>
        
        <button
          onClick={handleGoBackToLogin}
          className="reset-button"
        >
          로그인 화면으로 돌아가기
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

export default PasswordResetConfirmationPage;