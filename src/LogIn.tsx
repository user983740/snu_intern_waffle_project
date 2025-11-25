// LogIn.tsx
import React, {type JSX} from 'react';
import {labelStyle, inputStyle} from './SignUp';
import {useAuth} from './AuthContext';
import {useNavigate} from 'react-router-dom';

const BASE_URL = 'https://api-internhasha.wafflestudio.com';

type LogInRequest = {
  email: string;
  password: string;
};

type LogInResponse = {
  user: {
    id: string;
    userRole: 'APPLICANT';
  };
  token: string;
};

export const LogIn = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [focused, setFocused] = React.useState<string | null>(null);

  const isFormValid = email.length > 0 && password.length > 0;

  const {loginWithToken} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const requestBody: LogInRequest = {
      email: email + '@snu.ac.kr',
      password,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/auth/user/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          text || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
        );
      }

      const data: LogInResponse = await response.json();

      // ★ 토큰으로 로그인 처리 + 유저 정보 불러오기
      await loginWithToken(data.token);

      // 홈으로 이동
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          width: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <h1>로그인</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <label style={labelStyle}>
              이메일
              <div style={{position: 'relative', width: '620px'}}>
                <input
                  type='text'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle(focused === 'email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '45%',
                    transform: 'translateY(-50%)',
                    userSelect: 'none',
                  }}
                >
                  @snu.ac.kr
                </span>
              </div>
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              비밀번호
              <div style={{position: 'relative', width: '620px'}}>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle(focused === 'password')}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </label>
          </div>

          {errorMessage && (
            <div style={{color: 'red', fontSize: '14px'}}>{errorMessage}</div>
          )}

          <button
            type='submit'
            disabled={!isFormValid || isSubmitting}
            style={{
              width: '620px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: isFormValid && !isSubmitting ? 'blue' : 'gray',
              color: 'white',
              border: 'none',
              cursor: isFormValid && !isSubmitting ? 'pointer' : 'default',
              borderRadius: '5px',
            }}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};
