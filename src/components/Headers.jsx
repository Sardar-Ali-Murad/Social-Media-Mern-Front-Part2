import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import {BsFillMoonFill}  from "react-icons/bs"
import {TfiComments}  from "react-icons/tfi"
import {IoIosNotificationsOutline}   from "react-icons/io"
import {AiOutlineQuestionCircle}  from "react-icons/ai"
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {changeLight}  from "../features/userSlice"
import {CiDark}  from "react-icons/ci"
import {AiOutlineLogout}  from "react-icons/ai"
import {logoutUser}  from "../features/userSlice"
const Headers = () => {
  let dispatch=useDispatch()
  let {light}=useSelector((state)=>state.store)

    function logout(){
      dispatch(logoutUser())
      localStorage.removeItem("user")
  localStorage.removeItem("token")
    }
  return (
    <div className='headersMain' style={{background:!light?"black":"",color:!light?"white":"",boxShadow:!light?"2px 2px 2px white":""}}>
      <div className='headersPart1'>
        <Link to="/">
      <h4>ZolloPedia</h4>

        </Link>
      {/* <TextField
                fullWidth
                
                focused={!light?true:false}
                id="standard-bare"
                variant="outlined"
                defaultValue="Search Here"
                InputProps={{
                  endAdornment: (
                    // <IconButton>
                    <SearchIcon />
                    // </IconButton>
                    ),
                  }}
              /> */}
      </div>
        <AiOutlineLogout className='headersIcons smallLogout' onClick={logout}/>

      <div className='headersPart2' >
        {
          light?
          <BsFillMoonFill className='headersIcons' onClick={()=>dispatch(changeLight())}/>:
          <CiDark className='headersIcons' onClick={()=>dispatch(changeLight())}/>
        }
        <TfiComments  className='headersIcons'/>
        <IoIosNotificationsOutline  className='headersIcons'/>
        {/* <AiOutlineQuestionCircle  className='headersIcons'/> */}
        <AiOutlineLogout className='headersIcons' onClick={logout}/>
      </div>
        
    </div>
  )
}

export default Headers
