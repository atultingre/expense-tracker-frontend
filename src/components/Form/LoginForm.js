import React, { useContext, useState } from "react";
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
import { ColorContext } from "../../context/ColorContext/ColorContext";

const LoginForm = ({ onLogin}) => {
  const colorCombination = useContext(ColorContext);
  const { backgroundColor, color } = colorCombination;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const isValidEmail = (email) => {
    // Use a regular expression or any other validation logic to validate the email format
    // This is a simple example of email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {
      try {
        const response = await axios.post(`${BASE_URL}/api/login`, {
          email,
          password,
        });

        const token = response.data.token;
        onLogin(token);
      } catch (error) {
        console.error("Error logging in:", error);
        setError(error);
      }
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
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            fullWidth
            error={Boolean(emailError || error)}
            helperText={emailError || (error && "Invalid email")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            fullWidth
            error={Boolean(passwordError || error)}
            helperText={passwordError || (error && "Invalid password")}
            variant="outlined"
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
            variant="text"
            fullWidth
            component={Link}
            to="/reset-password"
            style={{ color: backgroundColor }}
          >
            Forgot Password?
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor, color }}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to="/signup"
            style={{ color: backgroundColor }}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
