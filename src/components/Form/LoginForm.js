import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = ({ onLogin, backgroundColor, color }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Define the 'error' variable
  const [showPassword, setShowPassword] = useState(false); // Define the 'showPassword' variable

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      const token = response.data.token;
      onLogin(token);
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error); // Update the 'error' value
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontFamily="Courgette, cursive"
      >
        Login
      </Typography>
      <Grid container component="form" onSubmit={handleSubmit} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            color={username.length <= 0 || error ? "error" : "success"}
            variant="outlined"
            helperText={error ? "Invalid username or password" : null} // Show the error message as helper text
            error={error !== null} // Set error prop to indicate an error
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            color={password.length <= 0 || error ? "error" : "success"}
            variant="outlined"
            helperText={error ? "Invalid username or password" : null} // Show the error message as helper text
            error={error !== null} // Set error prop to indicate an error
            InputProps={{
              // Add the show/hide password toggle button
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor: backgroundColor, color: color }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
