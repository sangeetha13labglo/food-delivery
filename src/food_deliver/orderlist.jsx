import React, { useState, useEffect } from "react";
import { Card, Typography, CardMedia, Button } from "@mui/material";
import axios from "axios";
import baseUrl from "./baseurl";
import { useParams } from "react-router-dom";

export default function Orderlist() {

  const [foodlist, setFoodlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [vieworder, setVieworder] = useState([])
  const [cancelorder, setCancelorder] = useState({})
  const Token = localStorage.getItem("token")
  const { id } = useParams()
  const [cancel, setCancel] = useState({
    "is_cancelled": true
  })

  const style1 = {
    float: "left",
    marginTop: "100px",
    margin: "100px",
    width: "350px",
    color: 'black',
    backgroundImage: "url('https://media.istockphoto.com/id/651808214/photo/abstract-white-wave.jpg?b=1&s=170667a&w=0&k=20&c=3IXLLYMji50L5c7JU8p-rJBt7vH8wnIcKV7LcHDMuyU=')",
    backgroundSize: "cover"
  };

  const handleFoodlist = () => {
    axios.get(baseUrl(`/food/`))
      .then((response) => setFoodlist(response.data))
      .catch((error) => console.log(error))
  }

  const handleCart = () => {
    axios.get(baseUrl(`/cart/`), {
      headers: {
        "Accept": "Application/json",
        " Content-Type": "Application/json",
        Authorization: `token ${Token}`
      },
    })
      .then((response) => setCart(response.data))
      .catch((error) => console.log(error))
  }

  const handleOrders = () => {
    axios.get(baseUrl("/customer/activeorders/"), {
      headers: {
        "Accept": "Application/json",
        " Content-Type": "Application/json",
        Authorization: `token ${Token}`
      },
    })
      .then((response) => setVieworder(response.data))
      .catch((error) => console.log(error))
  }

  const handleCancelorder = (id) => {
    console.log("id", id)
    axios.put(baseUrl(`/customer/cancell/${id}/`), cancel, {
      headers: {
        "Accept": "Application/json",
        "Content-Type": "Application/json",
        Authorization: `token ${Token}`
      }
    })
      .then((response) => setCancelorder(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => { handleOrders() }, [])
  useEffect(() => { handleFoodlist() }, [])
  useEffect(() => { handleCart() }, [])

  return (
    <div>
      {
        vieworder?.map((el) => {
          return (
            <div>
              {
                el?.cart.map((e) => {
                  return (
                    <>
                      {
                        cart?.filter((data) => data.id === e).map((detail) => {
                          return (
                            <>
                              {
                                foodlist?.filter((ele) => ele.id === detail.food).map((food) => {
                                  return (
                                    <div>
                                      <center>
                                        <Card style={{ ...style1 }}>
                                          <Typography>{food.name}</Typography>
                                          <Typography>{detail.id}</Typography>
                                          <CardMedia>
                                            <Typography><img src={food.image} style={{ width: "150px", marginTop: "10px" }} /></Typography>
                                          </CardMedia>
                                          <Typography>Quntity : {detail.quantity}</Typography>
                                          <Typography>Price : {food.price}</Typography>
                                          <Button variant="contained" color="error" onClick={() => handleCancelorder(el.id)}>cancel order</Button>
                                        </Card>
                                        <br /><br />
                                      </center>
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
            </div>
          )
        }
        )}
    </div>
  )
}