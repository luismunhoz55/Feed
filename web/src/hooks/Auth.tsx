import { createContext, useContext, useState } from "react";
import { api } from "@/api";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

interface Props {
  children: React.ReactNode;
}

interface SigninProps {
  email: string;
  password: string;
}

function AuthProvider({ children }: Props) {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [logged, setLogged] = useState(cookie["token"]);
  const [userData, setUserData] = useState({});

  async function signIn({ email, password }: SigninProps) {
    try {
      const response = await api.post("user/login", {
        email,
        password,
      });

      const { token } = response.data;

      const cookieExpiresInSeconds = 60 * 60 * 24 * 30;

      setCookie("token", token, { path: "/", maxAge: cookieExpiresInSeconds });

      setLogged(true);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        alert(error);
      }
    }
  }

  async function signOut() {
    removeCookie("token");

    setLogged(false);
  }

  async function getUserData() {
    if (!logged) {
      return {};
    }

    const token = cookie["token"];

    const response = await api.get("/user/data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      name: response.data.name,
      email: response.data.email,
    };
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, logged, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
