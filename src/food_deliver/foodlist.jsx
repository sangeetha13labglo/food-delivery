import { Typography, Card, CardMedia, CardContent, Button, IconButton } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import baseUrl from "./baseurl";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';

export default function Foodlist() {

  const [foodlist, setFoodlist] = useState([]);
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState([])
  const Token = localStorage.getItem("token");
  const [count, setCount] = useState(0);
  const navigate = useNavigate()

  const style = {
    float: "left",
    display: "flex",
    marginTop: "50px",
    margin: "100px",
    width: "400px",
    height: "450px",
    backgroundColor: "white",
    backgroundImage: "url('https://cdn1.vectorstock.com/i/thumb-large/19/15/old-paper-page-vector-31321915.jpg')",
    backgroundSize: "cover"
  };

  const handleFoodlist = () => {
    axios.get(baseUrl(`/food/`))
      .then((response) => setFoodlist(response.data))
      .catch((error) => console.log(error))
  }

  const handleTotalCartlist = () => {
    axios.get(baseUrl(`/cart/`), {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `token ${Token}`
      }
    })
      .then((response) => setTotal(response.data))
      .catch((error) => console.log(error))
  }

  const handleCart = (id) => {
    axios.post(baseUrl(`/cart/`), { "food": id, "quantity": count }, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `token ${Token}`
      }
    })
      .then((response) => setCart(response.data))
      .catch((error) => console.log(error))
  }

  const handleIncrement = () => {
    setCount(count + 1);
  }

  const handleDecrement = () => {
    setCount(count - 1)
  }

  const handleCartlist = () => {
    navigate(`/viewcartlist`)
  }

  const handleLogout = () => {
    navigate(`/login`)
  }

  useEffect(() => {
    handleFoodlist()
    handleTotalCartlist()
  }, [])

  return (
    <div>
      <center><h1 style={{ color: "black" }}>Welcome</h1></center>
      <Badge badgeContent={total?.length} color="primary">
        <IconButton style={{ marginLeft: "1500px", backgroundColor: "violet" }}><AddShoppingCartIcon onClick={handleCartlist} /></IconButton>
      </Badge>
      <IconButton><LogoutIcon style={{ marginLeft: "10px", backgroundColor: "white" }} onClick={handleLogout} /></IconButton>
      {
        foodlist.map((el) => {
          return (
            <div>
              <Card style={{ ...style }}>
                <center>
                  <h2>Welcome</h2>
                  <CardMedia>
                    <Typography><img src={el.image} style={{ width: "150px", marginLeft: "100px", marginTop: "10px" }} /></Typography>
                  </CardMedia><br />
                  <CardContent style={{ marginLeft: "100px" }}>
                    <Typography>Food : {el.name}</Typography>
                    <Typography>price:{el.price}</Typography>
                    <Typography>Quantity :<Button style={{ backgroundColor: "lightblue", color: "black" }} onClick={handleIncrement} >+</Button>
                      &nbsp;
                      <Button style={{ backgroundColor: "lightblue", color: "black" }} onClick={handleDecrement}  >-</Button></Typography><br />
                    <Button variant="contained" onClick={() => handleCart(el.id)}>Add to cart</Button><br />
                  </CardContent>
                </center>
              </Card>
            </div>
          )
        })
      }
    </div >
  )
}