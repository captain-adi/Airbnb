import App from "@/App";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DetailDashboard from "@/pages/DetailDashboard/DetailDashboard";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
    {
        path : "/",
        element : <App/>
        , children : [
            {
                path : "/", 
                element : <Dashboard/>
            },
            {
                path : '/rooms/:id',
                element : <DetailDashboard/>
            }
        ]
    }
])