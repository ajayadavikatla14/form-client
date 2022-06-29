import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import {Icon} from 'react-icons-kit';
import {eye} from 'react-icons-kit/icomoon/eye';
import {eyeBlocked} from 'react-icons-kit/icomoon/eyeBlocked';

async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)
    const result = await axios.post('http://localhost:3000/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
  }
const App = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setpassword]=useState('');
    const [password2,setPassword2]=useState('');
    const [success,setSuccess]=useState(false);
    const [icon1,setIcon1]=useState(eyeBlocked);
    const [type1,setType1]=useState('password');
    const [icon2,setIcon2]=useState(eyeBlocked);
    const [type2,setType2]=useState('password');
    const [file, setFile] = useState()
    const [images, setImages] = useState([])
    const [people,setPeople]=useState([]);

    const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
    }
    
    const changeOne=()=>{
        
        if(type1==='password'){
            setType1('text');
            setIcon1(eye);
        }
        else{
            setType1('password');
            setIcon1(eyeBlocked);
        }
    }
    const changeTwo=()=>{
        if(type2==='password'){
            setType2('text');
            setIcon2(eye);
        }
        else{
            setType2('password');
            setIcon2(eyeBlocked);
        }
    }

    const uploadFile=async(e)=>{
        e.preventDefault()
        const result = await postImage({image: file})
        setImages([result.image, ...images])
    }

     const submitHandler=async (e)=>{
        e.preventDefault();
        setSuccess(true);
        try {
          const body={name,email,password,password2};
          const response= await fetch('http://localhost:3000/postingData',{
            method:"POST",
            headers:{ "Content-Type" : "application/json"},
            body:JSON.stringify(body)
          });
          console.log(response);
          setName('');
          setEmail('');
          setpassword('');
          setPassword2('');
        } catch (error) {
          console.log(error);
        }
        
     }

     const showData=async()=>{
        const result = await axios.get('http://localhost:3000', 
        { headers: 
        {'Content-Type': 'applocation/json'}})
        setPeople(result.data); 
        console.log(result.data);
    }
     

  return (
    <>
        <div className="Signup">
            {
                success ? 
                <div className="loggedin">
                    Registration Successful..
                </div>
                :
                <div>
                <div className="l-head">
                    Signup 
                </div>
                <form action="/signup"  className='form' onSubmit={submitHandler} >
                    <label htmlFor="name">Username:</label> <br />
                    <input type="text" name="name" id='name' className="input-field" value={name}
                    placeholder='ex: john' required onChange={(e)=>{setName(e.target.value)}}  /><br /><br />
    
                    <label htmlFor="email">Email Address:</label> <br />
                    <input type="email" name="email" id='email' className="input-field" value={email}
                     placeholder='john@gmail.com'  required onChange={(e)=>{setEmail(e.target.value)}} /><br /><br />
    
                    <label htmlFor="password">Password:</label><br />
                    <input type={type1} name="password" id='password' className="input-field" value={password}
                     placeholder='********' required onChange={(e)=>{setpassword(e.target.value)}} autoComplete="off" />
    
                    <span onClick={changeOne} className='icon' ><Icon icon={icon1} /> </span>
                    <br /> <br />
    
                    <label htmlFor="password2">Confirm Password:</label><br />
                    <input type={type2} name="password2" id='password2' className="input-field" value={password2}
                     placeholder='********' required onChange={(e)=>{setPassword2(e.target.value)}} autoComplete="off" />
                    
                    <span onClick={changeTwo} className='icon' ><Icon icon={icon2} /> </span>
                    <br /> <br />

                    <input onChange={fileSelected} type="file" accept="image/*" required></input>
                    <button onClick={uploadFile}>Upload</button>
                    <button type="submit" className='glow-on-hover' onSubmit={(e)=>{submitHandler(e)}}>Signup</button>
                    <br /><br />
                </form>
                </div>
            }
        </div>

        <button onClick={showData} className="show" >Show Data</button>

        <div className="people-data">
            {people.map((item)=>{
                const {uid,name,email,password,password2,url}=item;
                return(
                    <div key={uid} >
                        <div className="data">
                            <div className="item">Name: {name}</div>
                            <div className="item">Email :{email}</div>
                            <div className="item">Password: {password}</div>
                            <div className="item">New Password: {password2}</div>
                            <div className="item profile-pic">
                            <img src={`http://localhost:3000/images/${url}`} className='pic' width='70px' height='70px' alt='cant'></img>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        
    </>
  )
}

export default App