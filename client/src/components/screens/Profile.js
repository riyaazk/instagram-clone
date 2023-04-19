import React, { useEffect, useState } from 'react'

const Profile = ()=> {
  const [myPost, setMyPost] = useState([]);
  useEffect(()=>{
    fetch('/myposts',{
      method : 'post',
      headers : {
        'Authorization' : 'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setMyPost(result.myPosts)
    }).catch(err=>{
      console.log(err);
    })
  },[]);
  return (
    <div className='container'>
        <div className='row' style={{marginTop : "20px"}}>
            <div className='col s4'>
                <img style={{width : "160px", height : "160px",borderRadius:"80px"}} 
                    src='https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=900&q=60' alt='profile'
                />
            </div>
            <div className='col s8'>
                <h4>Riyaz Khan</h4>
                <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                  <h5>30 posts</h5>
                  <h5>30 followers</h5>
                  <h5>30 following</h5>
                </div>
            </div>
        </div>
        <div className='gallery'>
          {
            myPost.map(post=>{
              return <img key={post._id} className='item' src={post.photo} alt='post' />
            })
          }
          
         
        </div>
    </div>
  )
}

export default Profile