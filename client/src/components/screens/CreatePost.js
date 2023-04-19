import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
const CreatePost = ()=> {
  const [post,setPost] = useState({
    title : "",
    body : "",
    image : "",

  })

  const [url,setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(url){
      fetch('/createpost',{
        method : 'post',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer '+localStorage.getItem('jwt')
        },
        body : JSON.stringify({
          title : post.title,
          body : post.body,
          imageUrl : url
        })
      }).then(res=> res.json())
      .then(data=>{
        console.log(data);
        navigate('/')
        M.toast({html: 'Post created successfully!!' , classes : "#4caf50 green"})
      }).catch(err=>{
        console.log(err);
      })
    }
  },[url])

  const postData = ()=>{
    const data = new FormData();
    data.append('file',post.image);
    data.append('upload_preset','insta-clone');
    data.append('cloud_name','rkg')
    
    fetch('https://api.cloudinary.com/v1_1/rkg/image/upload',{
      method : 'post', 
      body : data
    }).then(res => res.json())
    .then(result =>{
      console.log(result);
      setUrl(result.url)
      console.log(post);
      console.log(url);
    }).catch(error=>{
      console.log(error);
    })

    
  }
  return (
    <div className='card input-field'
    style={{margin: "20px auto",
            maxWidth : "500px",
            padding : "20px",
            textAlign : "center"
    }}  
    >
        <input type='text' placeholder='title' value={post.title} onChange={e => setPost({...post, title : e.target.value })} />
        <input type='text' placeholder='body'  value={post.body} onChange={e => setPost({...post, body : e.target.value })}/>
        <div className="file-field input-field">
        <div className="btn #29b6f6 light-blue lighten-1">
            <span>File</span>
            <input type="file" onChange={e => setPost({...post, image : e.target.files[0]})} />
            
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
        </div>
        </div>
        <button className='btn waves-effect waves-light #29b6f6 light-blue darken-3' onClick={postData} type='submit' name='action'>Submit Post</button>
    </div>
  )
}

export default CreatePost