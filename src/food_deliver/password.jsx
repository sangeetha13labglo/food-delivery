import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import baseUrl from "./baseurl";

export default function Password() {

  const Token = localStorage.getItem("token")

  const [password, setPassword] = useState({})
  const [detail, setDetail] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  const handlePassword = () => {
    axios.put(baseUrl("/api/change-password/"), password, {
      headers: {
        "Content-type": "application/json",
        Authorization: `token ${Token}`
      },
    })
      .then((response) => setDetail(response.data))
      .catch((error) => setError(error.response.data))
  }

  return (
    <div>
      <center>
        <Card style={{ width: "500px", marginTop: "50px", borderRadius: "20px" }}>
          <h2>Change-Password</h2>
          <TextField
            name="old_password"
            type="password"
            label="old_password"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          /><br /><br />
          <Typography>{error.old_password}</Typography>
          <TextField
            name="new_password"
            type="password"
            label="new-password"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          /><br /><br />
          <Typography>{error.new_password}</Typography>
          <Button onClick={handlePassword} variant="contained">change password</Button><br /><br />
        </Card>
      </center>
    </div>
  )
}