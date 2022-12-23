import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";

import baseUrl from "./baseurl";

export default function CreateFoodList() {

  const Token = localStorage.getItem("token")
  const [foodlist, setFoodlist] = useState({})
  const [setList] = useState({})
  const [image, setImage] = useState("")
  const is_organic = true;
  const is_vegan = true;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleImages = (e) => {
    setImage(e.target.files[0])
  }

  const handleChange = (e) => {
    setFoodlist({ ...foodlist, "is_organic": is_organic, [e.target.name]: e.target.value })
  }

  const handleFoodList = () => {

    let form_data = new FormData()

    form_data.append("name", foodlist.name)
    form_data.append("image", image, image.name)
    form_data.append("price", foodlist.price)
    form_data.append("is_organic", is_organic)
    form_data.append("is_vegan", is_vegan)

    axios.post(baseUrl("manager/foods/"), form_data, {
      headers: {
        " Content-Type": "multipart/form-data",
        Authorization: `token ${Token}`
      }
    })
      .then((response) => setList(response.data))
      .catch((error) => console.log(error))
  }
  return (
    <div>
      <center>
        <Card sx={{ width: "400px", marginTop: "150px", borderRadius: "20px" }}>
          <h2>Food List</h2>
          <TextField
            name="name"
            label="name"
            type="text"
            value={foodlist.name}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          /><br /><br />
          <form encType="multipart/form-data">
            <TextField
              name="image"
              label="image"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleImages}
              required
            /><br /><br />
          </form>
          <TextField
            name="price"
            label="price"
            type="text"
            value={foodlist.price}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          /><br /><br />
          <Button variant="contained" onClick={handleFoodList}>create list</Button>
          <br /><br />
        </Card>
      </center>
    </div>
  )
}

