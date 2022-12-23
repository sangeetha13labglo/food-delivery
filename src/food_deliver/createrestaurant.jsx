import { Card, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateRestaurent() {

  const Token = localStorage.getItem("token")
  const [detail, setDetail] = useState({})
  const [store, setStore] = useState({})
  const [image, setImage] = useState()

  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value })
  }
  console.log("details", detail)

  const handleImages = (e) => {
    setImage(e.target.files[0])
  }

  const handleClick = () => {

    let form_data = new FormData()

    form_data.append("image", image, image.name)
    form_data.append("name", detail.name)
    form_data.append("food_type", detail.food_type)
    form_data.append("city", detail.city)
    form_data.append("address", detail.address)
    form_data.append("open_time", detail.open_time)
    form_data.append("close_time", detail.close_time)

    axios.post("http://127.0.0.1:8000/manager/newrestaurant/", form_data, {
      headers: {
        " Content-Type": "multipart/form-data",
        Authorization: `token ${Token}`
      }
    })
      .then((response) => setStore(response.data))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <center>
        <h1>Welcome</h1>
        <Card sx={{
          width: "500px",
          backgroundImage: "url('https://images.unsplash.com/photo-1623416391054-d6df81f8177a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTM3OTI0N3x8ZW58MHx8fHw%3D&w=1000&q=80')",
          backgroundSize: "cover",
          backgroundRadius: "50px"
        }}>
          <h2>Create Restaurent</h2>
          <form encType="multipart/form-data">
            <TextField
              name="image"
              type="file"
              label="image"
              InputLabelProps={{ shrink: true }}
              onChange={handleImages}
              required
            /><br /><br />
          </form>
          <TextField
            name="name"
            type="text"
            label="name"
            value={detail.name}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="food_type"
            type="text"
            label="food_type"
            value={detail.food_type}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="city"
            type="text"
            label="city"
            value={detail.city}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="address"
            type="text"
            label="address"
            value={detail.address}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="open_time"
            type="time"
            label="open_time"
            value={detail.open_time}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="close_time"
            type="time"
            label="close_time"
            value={detail.close_time}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          /><br /><br />
          <Button variant="contained" onClick={handleClick}>Submit</Button>
          <br /><br />
          <p>Restaurants here...<Link to={`/viewrestaurantlist`}>Restaurant list</Link></p>
        </Card>
      </center>
    </div>
  )
}