// import logo from './logo.svg';
import './App.css';
import { MyRoute } from './MyRouter';
// import { Login } from './component/Auth/Login/Login.component';
// import { Register } from './component/Auth/Register/Register.component';
// import { Navbar } from './component/common/Header/Header.component';

import { ToastContainer} from 'react-toastify';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    // jsx
    // interpolation {}
    <div>
      
      {/* <Login/>
      <Register/> */}
      <Toaster
        toastOptions={{
          duration:3000
        }}
      ></Toaster>
      <ToastContainer
        position='top-center'
      ></ToastContainer>
      <MyRoute/>
    </div>
  );
}

export default App;
