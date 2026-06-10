
import './App.css'
// import { Publicacoes } from './pages/Publicacoes'
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <>
      {/* <Login/> */}
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="colored"
      />
    </>
  )
}

export default App
