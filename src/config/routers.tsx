import {Navigate, useRoutes} from "react-router-dom";
import Layout from "../view/layouts/Layout";

export default function Routers(){
    const routes = useRoutes([
        {
            path: "/dashboard",
            element: <Layout/>,
            children: [
                {element: <Navigate to={"/dashboard-admin"}/>, index: true},

            ]
        }
    ])
}