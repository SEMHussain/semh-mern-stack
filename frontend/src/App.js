import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Headers from './components/Headers';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Headers />
          <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/db' element={ <Dashboard /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
