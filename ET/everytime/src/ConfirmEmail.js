import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginForm.css'; 

function ConfirmEmail() {
    const [organizations, setOrganizations] = useState([]);  // 학교/단체 리스트 상태
    const [selectedOrgId, setSelectedOrgId] = useState('');  // 선택된 학교/단체 ID 상태
    const [emailSuffix, setEmailSuffix] = useState('');  // 이메일 접미사 상태
    const [email, setEmail] = useState('');  // 사용자 입력 이메일(접미사 제외) 상태
    const [error, setError] = useState('');  // 에러 메시지 상태
    const navigate = useNavigate();  // 페이지 네비게이션 함수

    useEffect(() => {
        // 가입 가능한 학교/단체 리스트를 불러오는 API 호출
        //fetch('/users/organization/list')
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/users/organization/list`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 0) {
                    setOrganizations(data.organizations);
                } else {
                    setError(data.error_msg || "학교/단체 리스트를 불러오는 데 실패했습니다.");
                }
            })
            .catch(() => setError("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요."));
    }, []);

    const handleOrgSelect = (event) => {
        const selectedId = event.target.value;
        setSelectedOrgId(selectedId);
        // 선택한 학교/단체에 해당하는 이메일 접미사를 불러오는 API 호출
        //fetch(`/users/organization/emails`, {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/users/organization/emails`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ org_id: selectedId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 0) {
                setEmailSuffix(data.emails[0]);  // 첫 번째 이메일 접미사를 사용
            } else {
                setError(data.error_msg);
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !emailSuffix) {
            setError("이메일 필드를 정확히 완성해주세요.");
            return;
        }
        const fullEmail = email + emailSuffix;
        // 인증 메일 발송 요청 API 호출
        //fetch('/users/organization/send_auth_email', {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/users/organization/send_auth_email`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                organization_id: selectedOrgId,
                email: fullEmail,
                id: "user_id"  // 사용자 ID가 필요함
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 0) {
                navigate('/Authentication', { state: { fullEmail, orgId: selectedOrgId } });
            } else {
                setError(data.error_msg);
            }
        });
    };

    return (
        <div className="login-container">
            <div className="title-container">
                <h1 className="title">Everytime</h1>
                <p className="subtitle">for Foreign</p>
            </div>
            <div>
                <h3 style={{ textAlign: 'center', margin: '10px 0' }}>회원가입을 진행해주세요!</h3>
                <h5 style={{ marginTop: '10px' }}>학교 이메일을 통해서 회원가입을 하실 수 있습니다!</h5>
            </div>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <select onChange={handleOrgSelect} value={selectedOrgId} className="login-input">
                    <option value="">소속 단체/학교를 선택하세요</option>
                    {organizations.map((org) => (
                        <option key={org.id} value={org.id}>{org.name} ({org.region})</option>
                    ))}
                </select>
                <div className="email-inputs">
                    <input
                        type="text"
                        className="login-input"
                        placeholder="이메일 앞부분을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <span className="email-suffix">{emailSuffix}</span>
                </div>
                <button type="submit" className="login-button">인증하기</button>
            </form>
            <div className="footer-links">
                <a href="/inquiry" className="auth-link">문의하기</a>
                <a href="/privacy-policy" className="auth-link">개인정보 처리방침</a>
                <a href="/terms-and-conditions" className="auth-link">이용약관</a>
            </div>
        </div>
    );
}

export default ConfirmEmail;
