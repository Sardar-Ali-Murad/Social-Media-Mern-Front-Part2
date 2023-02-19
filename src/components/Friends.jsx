import React from 'react'
import Card from '@mui/material/Card';
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { useSelector,useDispatch} from 'react-redux';
import {BsPeople} from "react-icons/bs"
import {userUpdate}  from "../features/userSlice"
import {FaPeopleArrows}  from "react-icons/fa"
import { Link } from 'react-router-dom';


const Friends = () => {
    let dispatch=useDispatch()
    let {user,light}=useSelector((state)=>state.store)
  return (
    <Card style={{padding:"10px",marginTop:"20px",background:!light?"black":"",color:!light?"white":"",border:!light?"2px solid white":""}} className="friendsMain singleCard">
        <h4>Friends</h4>
     {
        user.friends.map((friend)=>{
                return  <div className='postFront'>
                <div className='flexBox'>
                <Link to={`/user/${friend._id}`}>
                <Avatar sx={{ bgcolor: deepOrange[500] }} style={{cursor:"pointer"}}>
                  {friend.firstName.slice(0, 1)[0]}
                </Avatar>
                  </Link>
                <div>
                    <h4>{friend.firstName}</h4>
                </div>
                {
                    <FaPeopleArrows className='peopleIcon icons' onClick={()=>dispatch(userUpdate(friend._id))}/>
                }
                </div>
            </div>
            })
        }
    </Card>
  )
}

export default Friends
