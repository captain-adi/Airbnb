import { createContext, useContext, useState } from "react";


interface ILoginDialogContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LoginDialogContext = createContext<ILoginDialogContext | undefined>(undefined);


export const LoginDialogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <LoginDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </LoginDialogContext.Provider>
  );
};

// Custom hook to safely use the context
export const useLoginDialog = () => {
  const context = useContext(LoginDialogContext);
  if (!context) {
    throw new Error("useLoginDialog must be used within a LoginDialogContextProvider");
  }
  return context;
};

export { LoginDialogContext };