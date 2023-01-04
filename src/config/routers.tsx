import {Navigate, useRoutes} from "react-router-dom";
import Layout from "../view/layouts/Layout";
import LoginPage from "../view/pages/auth/LoginPage";

import DashboardPageAdmin from "../view/pages/admin/DashboardPageAdmin";
import Paper from "../view/pages/admin/paper/Paper";
import Thesis from "../view/pages/admin/thesis/Thesis";

export default function Routers(){
    const routes = useRoutes([
        {
            path: "/",
            element: <LoginPage/>,
            index: true
        },
        {
            path: "/dashboard-admin",
            element: <Layout/>,
            children: [
                {element: <Navigate to={"index"}/>},
                {path: "index", element: <DashboardPageAdmin/>},
                {path: "paper", element: <Paper/>},
                {path: "thesis", element: <Thesis/>}
            ]
        }
    ])

    return routes
}