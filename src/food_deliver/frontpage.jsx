import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function FrontPage() {

  const next = useNavigate()

  const handleClick = () => {
    next('/login')
  }

  return (
    <div>
      <center>
        <h1 style={{color:"black"}}>Welcome this page</h1>
       <Typography><img src={"https://media.istockphoto.com/id/1180802609/vector/click-button-with-hand-pointer-clicking-click-here-web-button-isolated-website-hand-finger.jpg?s=170667a&w=0&k=20&c=ID46SAVu2NZheUM8d2MpgVe1xW1qIJ3fi9RWxOwF4Zs="} 
       style={{height:"300px",marginTop:"200px"}}
       onClick={handleClick}
       /></Typography>
      </center>
    </div>
  )
}