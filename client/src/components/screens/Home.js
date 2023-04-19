import React, { useEffect, useState } from 'react'

const Home = ()=> {
    const [data,setData] = useState([]);

    useEffect(()=>{
        fetch('/posts',{
            method : 'get',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {

            setData(result.posts);
        }).catch(error=>{
            console.log(error);
        })
        
    },[])
  return (
    <div className='home'>
           
        {data.map(post =>{
            return (
            <div className='card' key={post._id} >
            <h5>{post.postedBy.name}</h5>
            <div>
            <img className='card-img' src={post.photo} alt='post' />
            </div>
            <div className='card-content'>
                <i className="material-icons" style={{color : 'red'}}>favorite</i>
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                <input type='text' placeholder='add a comment' />
                {/* <i className="material-icons">send</i> */}
            </div>
        </div> 
            )
        })}
    </div>
  )
}

export default Home