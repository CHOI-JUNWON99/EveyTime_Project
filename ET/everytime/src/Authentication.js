import React, { useState } from 'react';
import './css/LoginForm.css'; // 스타일 시트 임포트

function Authentication({ onLogin }) {
  const [code, setCode] = useState(''); // 사용자가 입력하는 인증번호 상태 관리
  const [email, setEmail] = useState(''); // 이메일 상태 관리, 이전 페이지에서 전달받아야 함
  const [userId, setUserId] = useState(''); // 사용자 ID 상태 관리, 이전 페이지에서 전달받거나 앱 상태 관리 필요

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const payload = {
      email: email, // 인증 이메일 주소
      code: code,  // 사용자가 입력한 인증번호
      id: userId   // 사용자 ID
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/users/organization/check_auth_code`, {
        //const response = await fetch('/users/organization/check_auth_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json(); // 서버 응답을 JSON 형태로 파싱

      if (data.status === 0) {
        onLogin();  // 로그인 처리 함수 호출 (인증 성공 시)
        alert('인증 성공!');  // 사용자에게 인증 성공 알림
      } else {
        alert('인증 실패: ' + data.error_msg);  // 인증 실패 메시지 표시
      }
    } catch (error) {
      alert('서버와의 통신에 실패했습니다. 다시 시도해주세요.');  // 네트워크 오류 처리
    }
  };

  return (
    <div className="login-container">
      <div className="title-container">
        <h1 className="title">Everytime</h1>
        <p className="subtitle">for Foreign</p>
      </div>
      <div>
        <h3 style={{textAlign:'center',margin:0}}>인증번호가 학교이메일에 도착했습니다!</h3>
        <h5 style={{marginTop:0, textAlign:'center'}}>학교 이메일에서 인증번호를 확인해주세요!</h5>
        </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"  // 입력 타입을 "text"로 설정
          className="login-input"
          placeholder="인증번호를 입력해주세요!(제한시간: 5분)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          인증번호 확인!
        </button>
      </form>
      <div className="footer">
        <span className="footer-text">
          *인증번호가 틀리면 학교이메일이 정확한지 확인해주세요!
        </span>
      </div>
    </div>
  );
}

export default Authentication;
