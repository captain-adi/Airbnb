import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllListing from './pages/AllListing.jsx';
import CreateListing from './pages/CreateListing.jsx';
import Hotel from './pages/Hotel.jsx';
import { ContextProvider } from './context/store.jsx';
import Update from './pages/Update.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ContextProvider><App /></ContextProvider>,
    children:[
      {
        path : "",
        element : <AllListing/>
      },
      {
        path : '/create',
        element : <CreateListing/>
      },
      {
        path : "/hotel/:id",
        element:<Hotel/>
      },{
        path : "/listing/update/:id",
        element : <Update/>
      }
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)
