import { AxiosError, api } from "@/services/api";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface User {
  created_at: string;
  email: string;
  id: number;
  name: string;
  role: string;
}

interface createContextProps {
  signIn: ({ email, password }: signInProps) => void;
  signOut: () => void;
  user: User | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface signInProps {
  email: string;
  password: string;
}

const AuthContext = createContext<createContextProps>({} as createContextProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<{ user: User | null }>({ user: null });
  const [loading, setLoading] = useState(true);

  async function signIn({ email, password }: signInProps) {
    try {
      const response = await api.post(
        "/sessions",
        { email, password },
        { withCredentials: true }
      );
      const { user } = response.data;

      localStorage.setItem("@explorer:user", JSON.stringify(user));

      setData({ user });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast(axiosError.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem("@explorer:user");

    setData({ user: null });
  }

  useEffect(() => {
    const user = localStorage.getItem("@explorer:user");

    if (user) {
      setData({
        user: JSON.parse(user),
      });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data.user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
