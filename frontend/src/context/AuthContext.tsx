import { useLogout } from "@/hooks/query";
import axiosInstance from "@/utils/axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
interface IUser {
  _id: string;
  username: string;
  email: string;
}


interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children } : {children: ReactNode}) => {
  const [user, setUser] = useState<IUser | null>(null);
   const { mutate: logout  } = useLogout();
  useEffect(()=>{
    const checkUser = async ()=>{
      axiosInstance.get('/auth/me').then((res)=>{
        setUser(res.data.user);
      }).catch((err)=>{
        console.log(err);
        setUser(null);
      });
    }
    checkUser();
  },[])

  
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        localStorage.removeItem("user_id");
        setUser(null);
        toast(res.message);
      },
      onError: (err : any) => {
        toast(err.response.data.message);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
  

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
