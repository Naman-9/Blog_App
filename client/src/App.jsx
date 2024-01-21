import './App.css'
import {BrowserRouter ,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Dashboard from './pages/Dashboard';
import { Header, FooterComp  } from './components';
import SignUp from './pages/SignUp';

function App() {
  return (

    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-out' element={<SignOut />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <FooterComp  />
    </BrowserRouter>

    )
}

export default App
 