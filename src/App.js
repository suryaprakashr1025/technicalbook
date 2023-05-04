import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import AdminDashboard from './adminDashboard/adminDashboard'
import View from './adminDashboard/View'
import UserDashboard from './userDashboard/userDashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/adminDashboard" element={<AdminDashboard/>}/> */}
        <Route path="/adminDashboard/:bookId" element={<AdminDashboard/>}/>
        <Route path="/view" element={<View/>}/>
        
        <Route path="/userDashboard" element={<UserDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
