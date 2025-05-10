import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllListing from "./pages/AllListing.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import Hotel from "./pages/Hotel.jsx";
import { Context, ContextProvider } from "./context/store.jsx";
import Update from "./pages/Update.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextProvider>
        <App />
      </ContextProvider>
    ),
    children: [
      {
        path: "",
        element: <AllListing />,
      },
      {
        path: "/create",
        element: <CreateListing />,
      },
      {
        path: "/hotel/:id",
        element: <Hotel />,
      },
      {
        path: "/listing/update/:id",
        element: <Update />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <ContextProvider>
        <Signup />{" "}
      </ContextProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <ContextProvider>
        <Login />
      </ContextProvider>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
