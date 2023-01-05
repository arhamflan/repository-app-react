import {Navigate, useRoutes} from "react-router-dom";
import Layout from "../view/layouts/Layout";
import LoginPage from "../view/pages/auth/LoginPage";

import DashboardPageAdmin from "../view/pages/admin/DashboardPageAdmin";
import Paper from "../view/pages/admin/paper/Paper";
import Thesis from "../view/pages/admin/thesis/Thesis";
import AddPaper from "../view/pages/admin/paper/AddPaper";
import Department from "../view/pages/admin/department/Department";
import AddDepartment from "../view/pages/admin/department/AddDepartment";
import EditDepartment from "../view/pages/admin/department/EditDepartment";
import DashboardPageUser from "../view/pages/user/DashboardPageUser";
import AddThesis from "../view/pages/admin/thesis/AddThesis";
import Users from "../view/pages/admin/users/Users";

import {GridView} from "@mui/icons-material";

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
                {path: "index", element: <DashboardPageAdmin/>, },
                {path: "paper", element: <Paper/>},
                {path: "add-paper", element: <AddPaper/>},
                {path: "thesis", element: <Thesis/>},
                {path: "add-thesis", element: <AddThesis/>},
                {path: "major", element: <Department/>},
                {path: "add-major", element: <AddDepartment/>},
                {path: "edit-major/:id", element: <EditDepartment/>},
                {path: "users", element: <Users/>}
            ]
        },
        {
            path: "/dashboard-user",
            element: <Layout/>,
            children: [
                {path: "index", element: <DashboardPageUser/>}
            ]
        }
    ])

    return routes
}