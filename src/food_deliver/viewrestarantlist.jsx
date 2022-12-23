import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "./baseurl";

export default function ViewrestaurantList() {

  const [restaurantlist, setRestaurantlist] = useState([])
  const nextPage = useNavigate()

  const style = {
    float: "left",
    display: "flex",
    marginTop: "20px",
    margin: "150px",
    width: "400px",
  };

  const handleRestaurantlist = () => {
    axios.get(baseUrl("/restaurant/"))
      .then((response) => setRestaurantlist(response.data))
      .catch((error) => console.log(error))
  }

  const handleManagerfoodlist = (id) => {
    nextPage(`/particularmanagerfoodlist/${id}`)
  }

  const handleCreateRestaurant = () => {
    nextPage('/createrestaurant')
  }

  useEffect(() => { handleRestaurantlist() }, [])

  return (
    <div>
      <Button variant="contained" onClick={handleCreateRestaurant} style={{ marginTop: '20px', marginLeft: "1400px" }}>Create restaurant</Button>
      {
        restaurantlist?.map((el) => {
          return (
            <div>
              <Card sx={{ ...style }}>
                <center>
                  <CardMedia>
                    <center><img src={el.image} style={{ width: "300px", marginLeft: "50px", marginTop: "50px" }} onClick={() => handleManagerfoodlist(el.id)} /></center>
                  </CardMedia>
                  <CardContent>
                    <Typography>{el.name}</Typography>
                  </CardContent>
                </center>
              </Card>
              <br />
            </div>
          )
        })
      }
    </div>
  )
}