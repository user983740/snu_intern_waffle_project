import React, {useState} from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

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
          <button style={textBtn}>로그인</button>
          <button style={textBtn}>회원가입</button>
        </div>
      </header>
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

export default App;
