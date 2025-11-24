// Signup.tsx
import React, {useState} from 'react';

const API_BASE_URL = 'https://api-internhasha.wafflestudio.com';

type SignUpRequest = {
  authType: 'APPLICANT';
  info: {
    type: string;
    name: string;
    email: string;
    password: string;
    successCode: string;
  };
};

type SignUpResponse = {
  user: {
    id: string;
    userRole: 'APPLICANT';
  };
  token: string;
};

export const SignUp = () => {
  // password form visibility states
  const [isSeenPassword, setIsSeenPassword] = useState(false);
  const [isSeenPasswordConfirm, setIsSeenPasswordConfirm] = useState(false);

  // form field states
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // form interaction states
  const [focused, setFocused] = useState<string | null>(null);
  const [showPasswordGuide, setShowPasswordGuide] = useState(false);
  const [showPasswordGuideConfirm, setShowPasswordGuideConfirm] =
    useState(false);
  const [isPass, setIsPass] = useState(false);

  // submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // password validation checks
  const isOkayPasswordLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasAllCases = hasUpperCase && hasLowerCase;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNoContinuousChars = !/(.)\1\1/.test(password);
  const isValidPassword =
    isOkayPasswordLength &&
    hasNumber &&
    hasAllCases &&
    hasSpecialChar &&
    hasNoContinuousChars;

  // overall form validity
  const isFormValid =
    userName !== '' &&
    password !== '' &&
    confirmPassword !== '' &&
    email !== '' &&
    isPass &&
    isValidPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const requestBody: SignUpRequest = {
      authType: 'APPLICANT',
      info: {
        type: 'LOCAL', // 백엔드에서 요구하는 값으로 맞추기
        name: userName,
        email,
        password,
        successCode: '123456', // 실제로는 인증 메일 코드 등으로 교체
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || '회원가입에 실패했습니다.');
      }

      const data: SignUpResponse = await response.json();

      // 예시: 토큰 저장 후 알림
      localStorage.setItem('accessToken', data.token);
      alert('회원가입이 완료되었습니다!');

      // 이 다음에 라우터를 쓰고 있다면 로그인 후 페이지로 이동시키면 됨
      // navigate('/'); 이런 식
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
        <h1>회원가입</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            alignItems: 'flex-start',
          }}
        >
          {/* 이 아래부터는 네가 이미 만든 입력 UI 그대로 */}
          <div>
            <label style={labelStyle}>
              이름
              <input
                type='text'
                name='username'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={inputStyle(focused === 'username')}
                onFocus={() => setFocused('username')}
                onBlur={() => setFocused(null)}
              />
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              비밀번호
              <div style={{position: 'relative', width: '620px'}}>
                <input
                  type={isSeenPassword ? 'text' : 'password'}
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle(focused === 'password')}
                  onFocus={() => {
                    setFocused('password');
                    setShowPasswordGuide(true);
                  }}
                  onBlur={() => setFocused(null)}
                />
                <span
                  style={eyeIconStyle}
                  onClick={() => setIsSeenPassword(!isSeenPassword)}
                >
                  {isSeenPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {showPasswordGuide && (
                <div
                  style={{color: 'gray', fontSize: '14px', marginTop: '5px'}}
                >
                  아래 조건들을 모두 만족시켜 주세요!
                  <ul style={{marginTop: '5px'}}>
                    <li
                      style={{
                        color: isOkayPasswordLength ? 'green' : 'red',
                      }}
                    >
                      8자 이상
                    </li>
                    <li style={{color: hasNumber ? 'green' : 'red'}}>
                      숫자 포함
                    </li>
                    <li style={{color: hasAllCases ? 'green' : 'red'}}>
                      대문자 및 소문자 포함
                    </li>
                    <li style={{color: hasSpecialChar ? 'green' : 'red'}}>
                      특수문자 포함
                    </li>
                    <li
                      style={{
                        color: hasNoContinuousChars ? 'green' : 'red',
                      }}
                    >
                      동일 문자 연속 사용 금지
                    </li>
                  </ul>
                </div>
              )}
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              비밀번호 확인
              <div style={{position: 'relative', width: '620px'}}>
                <input
                  type={isSeenPasswordConfirm ? 'text' : 'password'}
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setShowPasswordGuideConfirm(true);
                    setIsPass(e.target.value === password);
                  }}
                  style={inputStyle(focused === 'confirmPassword')}
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused(null)}
                />
                <span
                  style={eyeIconStyle}
                  onClick={() =>
                    setIsSeenPasswordConfirm(!isSeenPasswordConfirm)
                  }
                >
                  {isSeenPasswordConfirm ? '🙈' : '👁️'}
                </span>
              </div>
              {showPasswordGuideConfirm && (
                <div
                  style={{color: 'gray', fontSize: '14px', marginTop: '5px'}}
                >
                  {isPass
                    ? '비밀번호가 일치합니다.'
                    : '비밀번호가 일치하지 않습니다.'}
                </div>
              )}
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              이메일
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle(focused === 'email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
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
            {isSubmitting ? '회원가입 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
};

const inputStyle = (isFocused: boolean): React.CSSProperties => ({
  width: '620px',
  height: '30px',
  padding: '5px 10px',
  border: isFocused ? '2px solid blue' : '1px solid #aaa',
  borderRadius: '5px',
  outline: 'none',
  boxSizing: 'border-box',
});

const eyeIconStyle: React.CSSProperties = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  userSelect: 'none',
};
