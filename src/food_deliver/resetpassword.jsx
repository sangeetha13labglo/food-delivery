import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import baseUrl from "./baseurl";

export default function ResetPassword() {

  const Token = localStorage.getItem("token");
  const [password, setPassword] = useState({})
  const [pass, setPass] = useState({})
  const [reset, setReset] = useState([])
  const [store, setStore] = useState([])
  const [view, setView] = useState(false)

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  const handleResetchange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value })
  }

  const handleResetpassword = () => {
    axios.post(baseUrl("/api/password_reset/confirm/"), pass)
      .then((response) => setReset(response.data))
      .catch((error) => console.log(error))
  }

  const handleSend = () => {
    axios.post(baseUrl("/api/password_reset/"), password)
      .then((response) => setStore(response.data))
      .catch((error) => console.log(error))
    setView(true)
  }

  return (
    <div>
      <center>
        <Card sx={{ width: "300px", borderRadius: "20px", marginTop: '50px' }}>
          <h3>Rest password</h3>
          <TextField
            name="email"
            type="email"
            label="email"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          /><br /><br />
          <Button variant="contained" onClick={handleSend}>send</Button>
        </Card>
      </center>
      {
        view ? <>
          <center>
            <Card sx={{ width: "350px", borderRadius: "20px", marginTop: '20px' }}>
              <h3>Reset Password</h3>
              <TextField
                name="password"
                type="password"
                label="password"
                InputLabelProps={{ shrink: true }}
                onChange={handleResetchange}
              /><br /><br />
              <TextField
                name="token"
                label="token"
                InputLabelProps={{ shrink: true }}
                onChange={handleResetchange}
              /><br /><br />
              <Button variant='contained' onClick={handleResetpassword} >Reset password</Button>
              <br /><br />
            </Card>
          </center>
        </> : <></>
      }
    </div>
  )
}