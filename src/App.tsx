import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppContextProvider from "./providers/AppContextProviders"
import LoginPage from "./view/pages/auth/LoginPage"
import DashboardPage from "./view/pages/DashboardPage"



function App() {

  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage/>} />
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  )
}

export default App
