import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppContextProvider from "./providers/AppContextProviders"
import LoginPage from "./view/pages/auth/LoginPage"
import DashboardPage from "./view/pages/DashboardPage"
import ProfilePage from "./view/pages/ProfilePage"
import EditProfile from "./view/pages/auth/admin/EditProfile";



function App() {

  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/edit-profile-admin" element={<EditProfile/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  )
}

export default App
