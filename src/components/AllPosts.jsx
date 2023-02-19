import React from 'react'
import {getPosts}  from "../features/userSlice"
import { useSelector,useDispatch} from 'react-redux'
import SinglePost from './SinglePost'
import "./AllPosts.css"

const AllPosts = () => {
    let dispatch=useDispatch()
    let props=useSelector((data)=>data.store)
    React.useEffect(()=>{
      dispatch(getPosts())
    },[])

    // if(props.isLoading){
    //     return <div className='loading' style={{width:"40px",height:"40px"}}></div>
    // }

  return (
    <div className='allPostsMain'>
        {
            props.Posts.map((post)=>{
                return <div>
                     <SinglePost post={post}/>
                </div>
            })
        }
    </div>
  )
}

export default AllPosts
