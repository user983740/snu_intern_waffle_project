// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const BASE_URL = 'https://api-internhasha.wafflestudio.com';

type User = {
  id: string;
  name: string;
  email: string;
  userRole: 'APPLICANT';
};

type MeResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userRole: 'APPLICANT';
  email: string;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = token !== null && user !== null;

  // /api/auth/me 호출해서 유저 정보 불러오는 함수
  const fetchMe = async (jwt: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error('유저 정보를 불러오지 못했습니다.');
    }

    const data: MeResponse = await res.json();
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      userRole: data.userRole,
    };
  };

  // 로그인/회원가입에서 받은 토큰으로 상태 세팅
  const loginWithToken = async (jwt: string) => {
    // 토큰 저장
    setToken(jwt);
    localStorage.setItem('accessToken', jwt);

    // 유저 정보 요청
    const me = await fetchMe(jwt);
    setUser(me);
  };

  // 로그아웃: 서버에 세션 삭제 요청 + 로컬 상태 초기화
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  // 앱 시작 시 localStorage에 토큰 있으면 자동 로그인 시도
  useEffect(() => {
    const stored = localStorage.getItem('accessToken');
    if (!stored) return;

    loginWithToken(stored).catch(() => {
      // 토큰이 만료되었으면 그냥 지워버림
      localStorage.removeItem('accessToken');
      setToken(null);
      setUser(null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{isLoggedIn, user, token, loginWithToken, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
