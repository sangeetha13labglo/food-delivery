import { TextField, Button, Card, FormControlLabel, Radio, FormLabel, RadioGroup, FormControl } from "@mui/material";
import React, { useRef, useState } from "react";
import axios from "axios";
import baseUrl from "./baseurl";

export default function CustomerReg() {

  const [apidata, setApidata] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: ""
  });

  const [data, setData] = useState({})
  const [another, setAnother] = useState({
    birth_date: "",
    image: "",
    gender: "",
    phone_number: "",
    city: "",
  });
  const inputRef = useRef({});

  const handleChange = (e) => {
    setApidata({ ...apidata, [e.target.name]: e.target.value });
  }

  const handleAnotherChange = (e) => {
    setAnother({ ...another, [e.target.name]: e.target.value });
  }

  const handleClick = () => {
    if (apidata.username === "") {
      inputRef.current.username.focus();
    }
    else if (apidata.password === "") {
      inputRef.current.password.focus();
    }
    else if (apidata.first_name === "") {
      inputRef.current.first_name.focus();
    }
    else if (apidata.last_name === "") {
      inputRef.current.last_name.focus();
    }
    else if (apidata.email === "") {
      inputRef.current.email.focus();
    }
    else if (another.gender === "") {
      inputRef.current.gender.focus();
    }
    else if (another.phone_number === "") {
      inputRef.phone_number.focus();
    }
    else if (another.address === "") {
      inputRef.address.focus();
    }
    else if (another.city === "") {
      inputRef.current.city.focus();
    }

    axios.post(baseUrl("/register/"), { ...apidata, "profile": another })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <center>
        <Card sx={{ width: "500px", marginTop: "100px", backgroundColor: "white", borderRadius: "20px" }}>
          <h1>Register</h1>
          <TextField
            name="username"
            type="text"
            label="username"
            value={apidata.username}
            InputLabelProps={{ shrink: true }}
            inputRef={(ref) => (inputRef.current.username = ref)}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="password"
            type="password"
            label="password"
            value={apidata.password}
            InputLabelProps={{ shrink: true }}
            inputRef={(ref) => (inputRef.current.password = ref)}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="first_name"
            type="text"
            label="first_name"
            value={apidata.first_name}
            InputLabelProps={{ shrink: true }}
            inputRef={(ref) => (inputRef.current.first_name = ref)}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="last_name"
            type="text"
            label="last_name"
            value={apidata.last_name}
            InputLabelProps={{ shrink: true }}
            inputRef={(ref) => (inputRef.current.last_name = ref)}
            onChange={handleChange}
            required
          /><br /><br />
          <TextField
            name="email"
            type="email"
            label="email"
            value={apidata.email}
            InputLabelProps={{ shrink: true }}
            inputRef={(ref) => (inputRef.current.email = ref)}
            onChange={handleChange}
            required
          /><br /><br />
          <h5>Profile:</h5>

          <FormControl>
            <FormLabel >Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={another.gender}
              onChange={handleAnotherChange}
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl><br /><br />
          <TextField
            name="phone_number"
            type="text"
            label="phone_number"
            value={another.phone_number}
            inputLabelProps={{ shrink: true }}
            inputRef={(ref) => (inputRef.current.phone_number)}
            onChange={handleAnotherChange}
            required
          /><br /><br />
          <TextField
            name="address"
            type="text"
            label="address"
            value={another.address}
            InputLabelProps={{ shrink: true }}
            inputRef={(ref) => (inputRef.current.birth_date)}
            onChange={handleAnotherChange}
            required
          /><br /><br />
          <TextField
            name="city"
            type="text"
            label="city"
            value={another.city}
            inputLabelProps={{ shrink: true }}
            inputRef={(ref) => (inputRef.current.city)}
            onChange={handleAnotherChange}
            required
          /><br /><br />
          <Button variant="contained" onClick={handleClick}>Submit</Button>
          <br /><br />
        </Card>
      </center>
    </div>
  )
}