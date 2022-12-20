import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppContextProvider from "./providers/AppContextProviders"
import LoginPage from "./view/pages/auth/LoginPage"
import DashboardPage from "./view/pages/admin/DashboardPage"
import ProfilePage from "./view/pages/ProfilePage"
import EditProfile from "./view/pages/auth/admin/EditProfile";
import Department from "./view/pages/admin/department/Department";
import AddDepartment from "./view/pages/admin/department/AddDepartment";
import EditDepartment from "./view/pages/admin/department/EditDepartment";
import Thesis from "./view/pages/admin/paper/Thesis";
import AddThesis from "./view/pages/admin/paper/AddThesis";



function App() {

  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard-admin" element={<DashboardPage/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>

            {/*admin*/}
            <Route path="/edit-profile-admin" element={<EditProfile/>}/>

            <Route path="/major" element={<Department/>}/>
            <Route path="/add-major" element={<AddDepartment/>}/>
            <Route path="/edit-major/:id" element={<EditDepartment/>}/>

            <Route path="/paper" element={<Thesis/>}/>
            <Route path="/add-paper" element={<AddThesis/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  )
}

export default App
