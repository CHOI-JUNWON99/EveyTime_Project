import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './css/LoginForm.css';

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook here

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: email, password: password })
            });
            
            const data = await response.json();
            
            if (data.status === 0) {
                onLogin(data.session); // onLogin이 세션 토큰을 처리하도록 가정
                navigate('/dashboard'); // 대시보드 또는 필요한 곳으로 리디렉션. 대시보드: 메인페이지
            } else {
                setError(data.error_msg); // Display error message from server
            }
        } catch (err) {
            setError('Failed to connect to the server.'); // Handle server connection errors
        }
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
                <button type="submit" className="login-button">에브리타임 로그인</button>
                {error && <div className="error-message">{error}</div>}
            </form>
            <div className="links-container">
                <Link to="../ConfirmEmail" className="auth-link">회원가입</Link>
                <Link to="../PasswordResetPage" className="auth-link">비밀번호 찾기</Link>
            </div>
            <div>
                <button onClick={() => navigate('/PasswordResetPage')}>Reset Password</button>
                <button onClick={() => navigate('/PasswordResetConfirmationPage')}>Reset Password Confirmation</button>
                <button onClick={() => navigate('/Register')}>Register Account</button>
                <button onClick={() => navigate('/ConfirmEmail')}>Confirm Email</button>
                <button onClick={() => navigate('/authentication')}>Authentication</button>
            </div>
            <div className="footer">
                <span className="footer-text">
                    By clicking continue, you agree to our Terms of Service and Privacy Policy
                </span>
            </div>
        </div>
    );
}

export default LoginForm;
