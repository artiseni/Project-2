// import axios from 'axios'
import Posts from './pages/Posts'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Edit from './pages/Edit'
import Add from './pages/Add'
import './App.css';

const App = () => {

  const path = window.location.pathname

  switch (path) {
    case '/login':
      return <Login/> 
    case '/signup':
      return <Signup/>
    case '/home':
      return <Home />
    case '/home/edit':
      return <Edit />
    case '/home/add':
      return <Add />
    default:
      return <Posts/>
  }

}

export default App;
