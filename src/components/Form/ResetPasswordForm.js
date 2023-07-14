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

const ResetPasswordForm = ({ backgroundColor, color }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to reset the password
      await axios.post(`${BASE_URL}/api/reset-password`, {
        email,
        password,
        confirmPassword,
      });

      // Display success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "Your password has been reset successfully.",
      });
      navigate("/login");
      // Optionally, redirect the user to another page or perform additional actions
    } catch (error) {
      console.error("Error resetting password:", error);
      setError(error);

      // Display error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error Resetting Password",
        text: "An error occurred while resetting your password.",
      });
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
        Reset Password
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
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            color={password.length <= 0 || error ? "error" : "success"}
            variant="outlined"
            helperText={error ? "Invalid password" : null}
            error={error !== null}
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
          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            color={confirmPassword.length <= 0 || error ? "error" : "success"}
            variant="outlined"
            helperText={error ? "Passwords do not match" : null}
            error={error !== null}
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
            fullWidth
            style={{ backgroundColor, color }}>
            Reset Password
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to="/login"
            style={{ color: backgroundColor }}>
            Back to Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPasswordForm;
