import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  console.log(import.meta.env.VITE_BACKEND_URL)
  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState(true); 
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [allData, setAllData] = useState([]);
  const fetchdata = async () => {
    const response = await fetch(`${import.meta.env.BACKEND_URL}/api/listing`);
    const data = await response.json();
    console.log(data)
    setAllData(data);
  };
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`);
      setLoggedInUser(res.data.user);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("User is not logged in");
      } else {
        console.error("Something went wrong", err);
      }
      setLoggedInUser(null);
    } finally {
      setLoadingUser(false); // NEW LINE: whether success or error
    }
  };
  useEffect(() => {
    fetchdata();
    fetchUser();
  }, []);

  return (
    <Context.Provider
      value={{
        allData,
        fetchdata,
        fetchUser,
        setLoggedInUser,
        loggedInUser,
        navigate,
      }}
    >
      {children}
    </Context.Provider>
  );
};
