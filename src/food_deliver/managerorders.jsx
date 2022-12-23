import { Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "./baseurl";

export default function Manageractiveorders() {

  const [activeorder, setActiveorder] = useState([])
  const [cart, setCart] = useState([])
  const [food, setFood] = useState([])
  const Token = localStorage.getItem("token")

  const style = {
    float: "left",
    display: "flex",
    marginTop: "50px",
    margin: "50px",
    width: "400px",
    backgroundColor: "white",
  };

  const handleActiveorder = () => {
    axios.get(baseUrl("/manager/activeorders/"), {
      headers: {
        "Accept": "Application/json",
        " Content-Type": "Application/json",
        Authorization: `token ${Token}`
      }
    })
      .then((response) => setActiveorder(response.data))
      .catch((error) => console.log(error))
  }

  const handleCartlist = () => {
    axios.get(baseUrl("/cartlist/"), {
      headers: {
        "Accept": "Application/json",
        "Content-Type": "Application/json",
        Authorization: `token ${Token}`
      }
    })
      .then((response) => setCart(response.data))
      .catch((error) => console.log(error))
  }

  const handleFoodlist = () => {
    axios.get(baseUrl("/food/"))
      .then((response) => setFood(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => { handleActiveorder() }, [])
  useEffect(() => { handleCartlist() }, [])
  useEffect(() => { handleFoodlist() }, [])

  return (
    <>
      {
        activeorder?.map((ele) => {
          return (
            <>
              {
                ele.cart?.map((e) => {
                  return (
                    <>
                      {
                        cart?.filter((data) => data.id === e).map((el) => {
                          return (
                            <div>
                              {
                                food?.filter((element) => element.id === el.food).map((food) => {
                                  return (
                                    <div>
                                      <Card sx={{ ...style }}>
                                        <CardMedia>
                                          <img src={food.image} style={{ width: "200px" }}></img>
                                        </CardMedia>
                                        <CardContent>
                                          <Typography>Name : {food.name}</Typography>
                                          <Typography>Price : {food.price}</Typography>
                                          <Button variant="contained" color="success">Accept</Button>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                    </>
                  )
                })
              }
            </>
          )
        })
      }
    </>
  )
}