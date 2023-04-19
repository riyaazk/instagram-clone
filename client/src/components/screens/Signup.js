import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
const Signup = ()=> {
    const navigate = useNavigate();
    const [data,setData] = useState({
        name : "",
        email : "",
        password : ""
    })
    const signup = ()=>{
        fetch('/signup',{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>res.json())
        .then(result =>{
            console.log(result);
            if(result.error){
              return M.toast({html: result.error , classes : "#c62828 red darken-3"})
            }
            M.toast({html: result.message, classes : "#4caf50 green"})
            navigate('/signin')
        }).catch(error=>{
          console.log(error);
        })
    }
  return (
    
    <div className="card center auth-card input-field">
       <h2 className='brand-logo'>Instagram</h2>
       <input className='auth'  type='text' value={data.name} onChange={e => setData({...data, name : e.target.value})} placeholder='name' />
       <input className='auth' type='text' value={data.email} onChange={e => setData({...data, email : e.target.value})} placeholder='email' />
       <input className='auth' type='password' value={data.password} onChange={e => setData({...data, password : e.target.value})} placeholder='password' />
       <button className='btn waves-effect waves-light #29b6f6 light-blue lighten-1' type='submit' onClick={signup} name='action'>Signup</button>
       <h5><Link to='/signin' >Already have an account! login</Link></h5>
    </div>

  )
}

export default Signup