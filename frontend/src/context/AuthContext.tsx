import axiosInstance from "@/utils/axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";



interface IAuthContext {
  user: string | null;
  setUser: (user: string | null) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children } : {children: ReactNode}) => {
  const [user, setUser] = useState<string | null>(null);
    
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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
