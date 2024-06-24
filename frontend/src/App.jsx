
import {BrowserRouter, Route,Routes} from "react-router-dom";
import './App.css'
import HomePage from "./components/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";

import RegistrationForm from "./components/Register";
import LoginForm from "./components/Login";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { getUserFromStorage } from "./utils/getUserFromStorage";
import { useSelector } from "react-redux";
import AddCategory from "./components/Category/AddCategory";


function App() {

  const user = useSelector((state)=>state?.auth?.user);
  


  return (
   <BrowserRouter>
   {/*Nav */}
   
   {user? <PrivateNavbar/> : <PublicNavbar/>}
   <Routes>
    <Route path="/"  element={<HomePage/>}/>
    <Route path="/login"  element={<LoginForm/>}/>
    <Route path="/register" element={<RegistrationForm/>}/>
    <Route path="add-category" element={<AddCategory/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
