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
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const SignupForm = ({ onSignup, backgroundColor, color }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/register`, {
        email,
        password,
      });

      onSignup();
      Swal.fire({
        icon: "success",
        title: "User registered successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: "Email already exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: "An error occurred while registering the user.",
        });
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontFamily="Courgette, cursive"
      >
        Signup
      </Typography>
      <Grid container component="form" onSubmit={handleSubmit} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={emailError !== ""}
            helperText={emailError}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={passwordError !== ""}
            helperText={passwordError}
            fullWidth
            InputProps={{
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
            style={{ backgroundColor: backgroundColor, color: color }}
            fullWidth
          >
            Signup
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to="/login"
            style={{ color: backgroundColor }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupForm;