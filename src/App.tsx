import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppContextProvider from "./providers/AppContextProviders"
import LandingPage from "./view/LandingPage"

function App() {

  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  )
}

export default App
