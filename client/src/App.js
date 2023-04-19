import './App.css'
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import { createContext, useContext, useEffect } from 'react';
import { useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';

export const  UserContext = createContext();

const Routing = ()=>{
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));

    if(user){
      dispatch({ type: 'User', payload : user })
      navigate('/');
    }else{
      navigate('/signin')
    }
  },[])
  return(
    <Routes >
      <Route exact path='/' element={<Home />} />
      <Route path='/signin' element={<Login />}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/createpost' element={<CreatePost />} />
    </Routes>
  )
}

const App = ()=> {
  const [state , dispatch] = useReducer(reducer,initialState);
  
  return (  
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
    </BrowserRouter> 
    </UserContext.Provider>
   
  );
}

export default App;
