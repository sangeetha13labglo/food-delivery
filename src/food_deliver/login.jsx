import axios from "axios";
import { Button, Card, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import baseUrl from "./baseurl";

export default function Login() {

  const [login, setLogin] = useState({})
  const [view, setView] = useState(false)
  const [manager, setManager] = useState("")
  const nextpage = useNavigate()
  const [token, setToken] = useState({
    token: "",
    manager: "",
    user: ""
  })


  const handleText = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const handleLogin = () => {
    axios.post(baseUrl("/login/"), login)
      .then((response) => setToken(response.data))
      .catch((error) => console.log(error))
  }

  const handleClick = () => {
    setView(true)
  }

  const handleChangepassword = () => {
    nextpage(`/password`)
  }

  useEffect(() => {
    if (token.token !== undefined && token.token !== "" && token.manager === "true") {
      localStorage.setItem("token", token.token)
      localStorage.setItem("user", token.user)
      nextpage('/managerfoodlist')
    }
    else if (token.token !== undefined && token.token !== "" && token.manager === "false") {
      localStorage.setItem("token", token.token)
      localStorage.setItem("user", token.user)
      nextpage('/foodlist')
    }
  }, [token.token])

  return (
    <div>
      <center>
        <Card sx={{ width: "1000px", height: "800px", backgroundColor: "black", marginTop: "100px", borderRadius: "30px" }}>
          <Card sx={{
            width: "500px",
            marginTop: "250px",
            borderRadius: '30px',
            backgroundColor: 'white'
          }}>
            <h2>Login</h2>
            <IconButton style={{ marginLeft: "400px", marginTop: "-60px" }} onClick={handleClick}><MoreVertIcon /></IconButton>
            {
              view ? <>
                <Card sx={{ width: "200px", marginLeft: "200px", marginTop: "-20px", backgroundColor: "lightseagreen" }}>
                  <Typography onClick={handleChangepassword}>Change password</Typography>
                </Card>
              </> : <></>
            }<br /><br />
            <TextField
              name="username"
              type="text"
              label="username"
              InputLabelProps={{ shrink: true }}
              value={login.username}
              onChange={handleText}
            /><br /><br />
            <TextField
              name="password"
              type="password"
              label="password"
              InputLabelProps={{ shrink: true }}
              value={login.password}
              onChange={handleText}
            /><br /><br />
            <Button variant="contained" onClick={handleLogin}>login</Button><br /><br />
            <Typography>Forgot Password? <Link to={`/resetpassword`}>Reset password</Link> </Typography>
            <Typography>create new account  <Link to={`/customerreg`}>Register</Link></Typography>
          </Card>
        </Card>
      </center>
    </div>
  )
}
