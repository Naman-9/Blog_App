import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Dashboard from './pages/Dashboard';
import { Header, FooterComp } from './components';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
}

export default App;
