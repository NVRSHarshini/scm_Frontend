import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "../src/pages/dashboard.jsx";
import Toast from "./pages/TestToasts.jsx";
import Registration from './pages/registration.jsx';
import SuccessPage from './pages/Login_success.jsx';
import Create_ship from './pages/Create_ship.jsx';
import Print from './pages/Print.jsx';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Error403Page from './pages/Error403Page.jsx';
import DeviceData from './pages/DeviceData.jsx';
import MyAccount from "./pages/MyAcct.jsx";
function App() {
  return (
    <ToastProvider>
    <Router>
      <Routes>
      <Route exact path="/" element={<Registration/>} />
      <Route exact path="/myAcct" element={<MyAccount/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>} />        
        <Route exact path="/success" element={<SuccessPage/>} />       
        <Route exact path="/newShip" element={<Create_ship/>}/>               
        <Route path="/print" element={<Print />} />
        <Route path="/Error403" element={<Error403Page/>} />
        <Route path="/Toast" element={<Toast />} />
        <Route path="/DeviceData" element={<DeviceData />} />
        </Routes>

     </Router>
     </ToastProvider>
    );
}

export default App;
