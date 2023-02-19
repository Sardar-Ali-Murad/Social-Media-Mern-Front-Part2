import React from 'react'
import Card from '@mui/material/Card';
import "./Sponsered.css"
import Img from "../assets/1.jpg"
import { useSelector } from 'react-redux';
const Sponsered = () => {
  let {light}=useSelector((state)=>state.store)
  return (
      <Card className='sponseredMain singleCard'  style={{background:!light?"black":"",color:!light?"white":"",border:!light?"2px solid white":""}}>
        <div className='sponseredStart'>
        <h6>Sponsered</h6>
        <p>Create Adds</p>
        </div>
        <img src={Img} className="sponseredImg"/>
        <div className='sponseredStart'>
        <h6>Mekka Cosmestic</h6>
        <p>abc.web.com</p>
        </div>
        <p>Browse 215,674 makeup products stock photos and images available, or search for table top or skin care products</p>
      </Card>
    
  )
}

export default Sponsered
