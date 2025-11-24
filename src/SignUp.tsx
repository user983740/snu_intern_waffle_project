// Signup.tsx
import React, {useState, type JSX} from 'react';

export const SignUp = () => {
  const [isSeenPassword, setIsSeenPassword] = useState(false);
  const [isSeenPasswordConfirm, setIsSeenPasswordConfirm] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [focused, setFocused] = useState<string | null>(null);
  const [showPasswordGuide, setShowPasswordGuide] = useState(false);
  const [showPasswordGuideConfirm, setShowPasswordGuideConfirm] =
    useState(false);
  const [isPass, setIsPass] = useState(false);

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

  const isFormValid =
    userName !== '' &&
    password !== '' &&
    confirmPassword !== '' &&
    email !== '' &&
    isPass &&
    isValidPassword;

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
        <h1> 회원가입</h1>

        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            alignItems: 'flex-start',
          }}
        >
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
                {showPasswordGuideConfirm && (
                  <div
                    style={{color: 'gray', fontSize: '14px', marginTop: '5px'}}
                  >
                    {isPass
                      ? '비밀번호가 일치합니다.'
                      : '비밀번호가 일치하지 않습니다.'}
                  </div>
                )}
              </div>
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

          <button
            type='submit'
            disabled={!isFormValid}
            style={{
              width: '620px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            회원가입
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
