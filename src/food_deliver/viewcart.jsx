import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, TextField, Button, IconButton } from "@mui/material";
import baseUrl from "./baseurl";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useNavigate } from "react-router-dom";


export default function Viewcartlist() {

  const [viewfoodlist, setViewfoodlist] = useState([])
  const Token = localStorage.getItem("token")
  const [foodlist, setFoodlist] = useState([]);
  const [orderlist, setOrderlist] = useState({});
  const [takenotes, setTakenotes] = useState(false)
  const [view, setView] = useState(true)
  const [note, setNote] = useState("")
  const [remove, setRemove] = useState({})
  const nextpage = useNavigate()


  const style = {
    float: "left",
    marginTop: "100px",
    margin: "50px",
    width: "400px",
    height: "200px",
    backgroundImage: "url('https://media.istockphoto.com/id/651808214/photo/abstract-white-wave.jpg?b=1&s=170667a&w=0&k=20&c=3IXLLYMji50L5c7JU8p-rJBt7vH8wnIcKV7LcHDMuyU=')",
    backgroundSize: "cover"

  };

  const handleOrderlist = (foods) => {
    axios.post(baseUrl("/customer/neworder/"), { "note": note, "cart": [foods] }, {
      headers: {
        " Content-Type": "Application/json",
        " Accept": "Application/json",
        "Authorization": `token ${Token}`
      },
    })
      .then((response) => setOrderlist(response.data))
      .catch((error) => console.log(error))
  }

  const handleCartlist = () => {
    axios.get(baseUrl(`/cart/`), {
      headers: {
        " Content-Type": "Application/json",
        " Content-Type": "Application/json",
        Authorization: `token ${Token}`
      },
    })
      .then((response) => setViewfoodlist(response.data))
      .catch((error) => console.log(error))
  }

  const handleDelete = (id) => {
    axios.delete(baseUrl(`/cart/${id}/`), {
      headers: {
        "Accept": "Application/json",
        " Content-Type": "Application/json",
        Authorization: `token ${Token}`
      },
    })
      .then((response) => setRemove(response.data))
      .catch((error) => console.log(error))
  }

  const handleView = () => {
    nextpage('/orderlist')
  }
  const handleTakeNotes = () => {
    setTakenotes(true)
  }

  const handleNotes = (e) => {
    setNote(e.target.value)
  }

  useEffect(() => { handleCartlist() }, [])

  return (
    <div>
      <center> <h1 style={{ color: "black" }}>Cart List</h1></center>
      <IconButton style={{ marginLeft: "1500px", backgroundColor: "lightgreen" }} onClick={handleView}><LocalGroceryStoreIcon />order details</IconButton>
      {
        viewfoodlist.map((el) => {
          return (
            <div>
              <center>
                <Card sx={{ ...style }}>
                  <Typography style={{ marginTop: '20px' }}>Food Id : {el.food}</Typography>
                  <Typography>Quamtity : {el.quantity}</Typography>
                  <Typography>Food Name : {el.name}</Typography>
                  <Typography>Restaurant Name : {el.resname}</Typography>
                  <Typography>Price : {el.price}</Typography>
                  <NoteAltIcon onClick={handleTakeNotes} />
                  {
                    takenotes ? <><TextField name="notes" type="text" onChange={handleNotes} multiline /></> : <></>
                  }
                  <Button variant="contained" onClick={() => handleOrderlist(el.id)} >order now</Button>&nbsp;&nbsp;
                  <Button variant="contained" color="error" onClick={() => handleDelete(el.id)}>cancel cart</Button>
                </Card>
                <br />
              </center>
            </div>
          )
        })
      }
    </div>
  )
}