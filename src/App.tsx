import React, {useState, type JSX} from 'react';
import SignUp from './SignUp';
import './App.css';

type Screen = 'home' | 'login' | 'signup';

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <div>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          borderBottom: '2px solid #ddd',
        }}
      >
        <div style={{fontWeight: 'bold', fontSize: '18px'}}>스누인턴</div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {isLoggedIn ? (
            <div>님</div>
          ) : (
            <LoginBtn onClick={() => setScreen('login')} />
          )}
          <button style={textBtn} onClick={() => setScreen('signup')}>
            회원가입
          </button>
        </div>
      </header>
      <body>
        {screen === 'home' && <div>홈 화면</div>}
        {screen === 'login' && <div>로그인 화면</div>}
        {screen === 'signup' && <SignUp />}
      </body>
    </div>
  );
}

const textBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '18px',
  padding: '0',
};

function LoginBtn({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <button style={textBtn} onClick={onClick}>
      로그인
    </button>
  );
}

export default App;
