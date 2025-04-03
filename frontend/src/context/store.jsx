import { createContext, useContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const fetchdata = async () => {
    const response = await fetch("/api/listing");
    const data = await response.json();
    setAllData(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return <Context.Provider value={{ allData,fetchdata }}>{children}</Context.Provider>;
};
