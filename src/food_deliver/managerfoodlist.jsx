import { Typography, Card, CardMedia, CardContent, Button, IconButton } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import baseUrl from "./baseurl";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate, useParams } from "react-router-dom";


export default function ManagerFoodlist() {

  const [foodlist, setFoodlist] = useState([]);
  const nextpage = useNavigate();
  const Token = localStorage.getItem("token")
  const { id } = useParams()
  const style = {
    float: "left",
    display: "flex",
    marginTop: "100px",
    margin: "100px",
    width: "400px",
    height: "400px",
    backgroundColor: "white",
    backgroundImage: "url('https://cdn1.vectorstock.com/i/thumb-large/19/15/old-paper-page-vector-31321915.jpg')",
    backgroundSize: "cover"
  };

  const handleFoodlist = () => {
    axios.get(baseUrl("/food/"))
      .then((response) => setFoodlist(response.data))
      .catch((error) => console.log(error))
  }

  const handleActiveorders = () => {
    nextpage('/manageractiveorders')
  }

  const handleRestaurantList = () => {
    nextpage('/viewrestaurantlist')
  }

  const handleCreatefoodlist = () => {
    nextpage('/createfoodlist')
  }

  useEffect(() => { handleFoodlist() }, [])

  return (
    <div>
      <center><h2 sx={{color:"black"}}>Manager Foodlist</h2></center>
      <IconButton style={{ marginLeft: "1700px", backgroundColor: "white", marginTop: "50px" }} onClick={handleRestaurantList} ><StorefrontIcon /></IconButton>
      <Button style={{ marginLeft: "1400px" }} onClick={handleCreatefoodlist} variant="contained">Create Foodlist</Button>&nbsp;
      <Button variant="contained" onClick={handleActiveorders}>manager active orders</Button>
      {
        foodlist.map((el) => {
          return (
            <div>
              <Card style={{ ...style }}>
                <center>
                  <CardMedia>
                    <Typography><img src={el.image} style={{ width: "150px", marginLeft: "100px", marginTop: "50px" }} /></Typography>
                  </CardMedia><br />
                  <CardContent style={{ marginLeft: "100px" }}>
                    <Typography>{el.name}</Typography>
                    <Typography>price:{el.price}</Typography>
                    <Button variant="contained">order now</Button><br /><br />
                  </CardContent>
                </center>
              </Card>
            </div>
          )
        })
      }
    </div>
  )
}