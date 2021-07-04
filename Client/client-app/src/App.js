// import axios from 'axios'
import Posts from './pages/Posts'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import './App.css';

const App = () => {

  const path = window.location.pathname

  switch (path) {
    case '/login':
      return <Login/> 
    case '/signup':
      return <Signup/>
    case '/home':
      return <Home/>
    default:
      return <Posts/>
  }

}

export default App;
