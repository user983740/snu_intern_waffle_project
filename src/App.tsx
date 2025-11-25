import React, {type JSX} from 'react';
import './App.css';
import {SignUp} from './SignUp';
import {Home} from './Home';
import {LogIn} from './LogIn';
import {useAuth} from './AuthContext';
import {Routes, Route, Link} from 'react-router-dom';

function App(): JSX.Element {
  const {isLoggedIn, user, logout} = useAuth();

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
        {/* 홈 화면으로 이동 */}
        <Link
          to='/'
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          스누인턴
        </Link>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {isLoggedIn ? (
            <>
              <div>{user?.name}님</div>
              <button style={textBtn} onClick={logout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              {/* 로그인 페이지로 이동 */}
              <Link to='/login' style={textBtnLink}>
                로그인
              </Link>
              {/* 회원가입 페이지로 이동 */}
              <Link to='/signup' style={textBtnLink}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </header>

      <main style={{padding: '20px'}}>
        <Routes>
          {/* 홈 화면 */}
          <Route path='/' element={<Home />} />
          {/* 로그인 화면 */}
          <Route path='/login' element={<LogIn />} />
          {/* 회원가입 화면 */}
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </main>
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

const textBtnLink: React.CSSProperties = {
  ...textBtn,
  textDecoration: 'none',
  color: 'black',
};

export default App;
