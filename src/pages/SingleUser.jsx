import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux'
import {singleUser,getSingleUserId}  from "../features/userSlice"
import SinglePost from '../components/SinglePost'
const SingleUser = () => {
    let {id}=useParams()
    let dispatch=useDispatch()
    React.useEffect(()=>{
      dispatch(singleUser(id))     
      dispatch(getSingleUserId({id}))
    },[])
    let {light}=useSelector((state)=>state.store)
    let {singleUser:user,singleUserPosts,singleUserId}=useSelector((state)=>state.store)
  return (
    <div style={{background:!light?"black":"",padding:"20px"}}>
    <div className='div-center-80 grid-22' style={{marginTop:"30px",background:!light?"black":""}}>
      {
          singleUserPosts.map((post)=>{
            return(
                <div>
             <SinglePost post={post}/>
            </div>
                )
            })
        }
    </div>
        </div>
  )
}

export default SingleUser
