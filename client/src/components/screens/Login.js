import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'
const Login = ()=> {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const [data,setData] = useState({
        email : '',
        password : ''
    })
    const signin = () =>{
        fetch('/signin',{
            method : 'post',
            headers :{
                'Content-Type' : 'application/json',
                
            },
            body : JSON.stringify(data)
        }).then(res => res.json())
        .then((result)=>{
            console.log(result);
            if(result.error){
                return M.toast({html: result.error , classes : "#c62828 red darken-3"})
            }
            localStorage.setItem('jwt',result.token)
            localStorage.setItem('user',JSON.stringify(result.user))
            dispatch({type: 'USER', payload : result.user})
            M.toast({html: 'Signin success' , classes : "#4caf50 green"})
            navigate('/')
        }).catch(error=>{
            console.log(error);
        })
    }
  return (
    <>
    <div className="card center auth-card input-field">
       <h2 className='brand-logo'>Instagram</h2>
       <input className='auth' value={data.email} onChange={e => setData({...data, email : e.target.value})}  type='text' placeholder='email' />
       <input className='auth' value={data.password} onChange={e => setData({...data, password : e.target.value})} type='password' placeholder='password' />
       <button className='btn waves-effect waves-light #29b6f6 light-blue lighten-1' type='submit' name='action' onClick={signin}>Login</button>
       <h5><Link to='/signup' >Don't have an account! Signup</Link></h5>
    </div>
    </>
  )
}

export default Login