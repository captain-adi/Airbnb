import { createContext, useContext, useState, type ReactNode } from "react";



interface IAuthContext {
  user: string | null;
  setUser: (user: string | null) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children } : {children: ReactNode}) => {
  const [user, setUser] = useState<string | null>(null);


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
