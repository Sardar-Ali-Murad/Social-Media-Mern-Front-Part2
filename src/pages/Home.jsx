import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logoutUser}  from "../features/userSlice"
import {UserInfo,Post,Sponsered,AllPosts,Friends} from "../components/index"
import "./index.css"

const Home = () => {
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let props=useSelector((state)=>state.store)

  React.useEffect(()=>{
    setTimeout(()=>{
      if(props.user===null){
        navigate("/login")
      }
    },2000)
  },[props.user])



  function logout(){
    dispatch(logoutUser())
     localStorage.removeItem("user")
     localStorage.removeItem("token")
  }

  return (
    <div className='homeMain' style={{background:!props.light?"black":"",color:!props.light?"white":"",padding:"20px"}}>
      <div className='userWrapper'>
     <UserInfo user={props.user}/>
      </div>
     <div className='postWrapper'>
     <Post user={props.user}/>
     <AllPosts/>
     </div>
     <div className='sponsers sponsersWrapper'>
     <Sponsered/>
     <Friends/>
     </div>
    </div>
  )
}

export default Home
