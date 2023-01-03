import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppContextProvider from "./providers/AppContextProviders"
import LoginPage from "./view/pages/auth/LoginPage"
import DashboardPageAdmin from "./view/pages/admin/DashboardPageAdmin"
import ProfilePage from "./view/pages/ProfilePage"
import EditProfile from "./view/pages/auth/admin/EditProfile";
import Department from "./view/pages/admin/department/Department";
import AddDepartment from "./view/pages/admin/department/AddDepartment";
import EditDepartment from "./view/pages/admin/department/EditDepartment";
import Thesis from "./view/pages/admin/thesis/Thesis";
import AddThesis from "./view/pages/admin/thesis/AddThesis";
import Paper from "./view/pages/admin/paper/Paper";
import AddPaper from "./view/pages/admin/paper/AddPaper";
import DashboardPageStudent from "./view/pages/students/DashboardPageStudent";
import Users from "./view/pages/admin/users/Users";
import Routers from "./config/routers";



function App() {

  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
            <Routers/>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  )
}

export default App
