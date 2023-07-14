import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BASE_URL } from "../../api";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin, backgroundColor, color }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Define the 'error' variable
  const [showPassword, setShowPassword] = useState(false); // Define the 'showPassword' variable

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
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
        fontFamily="Courgette, cursive">
        Login
      </Typography>
      <Grid container component="form" onSubmit={handleSubmit} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            color={email.length <= 0 || error ? "error" : "success"}
            variant="outlined"
            helperText={error ? "Invalid email" : null}
            error={error !== null}
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
            helperText={error ? "Invalid email or password" : null} // Show the error message as helper text
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
            variant="text"
            fullWidth
            component={Link}
            // onClick={handleForgotPassword}
            to="/reset-password"
            style={{ color: backgroundColor }}>
            Forgot Password?
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor: backgroundColor, color: color }}>
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to="/signup"
            style={{ color: backgroundColor }}>
            Signup
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
