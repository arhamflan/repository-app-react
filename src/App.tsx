import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppContextProvider from "./providers/AppContextProviders"
import Routers from "./config/routers";
import.meta.env.NODE_ENV



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
