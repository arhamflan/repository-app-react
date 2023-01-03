import {Navigate, useRoutes} from "react-router-dom";
import Layout from "../view/layouts/Layout";
import LoginPage from "../view/pages/auth/LoginPage";

import DashboardPageAdmin from "../view/pages/admin/DashboardPageAdmin";
import Paper from "../view/pages/admin/paper/Paper";

export default function Routers(){
    const routes = useRoutes([
        {
            path: "/",
            element: <LoginPage/>,
            index: true
        },
        {
            path: "/dashboard",
            element: <Layout/>,
            children: [
                {element: <Navigate to={"dashboard-admin"}/>},
                {path: "dashboard-admin", element: <DashboardPageAdmin/>},
                {path: "paper", element: <Paper/>}
            ]
        }
    ])

    return routes
}