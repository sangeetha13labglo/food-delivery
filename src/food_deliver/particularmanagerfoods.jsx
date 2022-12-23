import { Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import baseUrl from "./baseurl";
import { useParams } from "react-router-dom";

export default function ParticularManagerFoodlist() {

  const [foodlist, setFoodlist] = useState([]);
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

  useEffect(() => { handleFoodlist() }, [])

  return (
    <div>
      <center><h2 sx={{ color: "black" }}>Manager Foodlist</h2></center>
      {
        foodlist?.filter((data) => data.restaurant === parseInt(id))?.map((el) => {
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