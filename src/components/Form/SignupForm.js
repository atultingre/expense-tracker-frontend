import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Container,
  Grid,IconButton, InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignupForm = ({ onSignup, backgroundColor, color }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Define the 'showPassword' variable

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/register", {
        username,
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
          text: "Username already exists",
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            color={username.length <= 0 ? "error" : "success"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            color={password.length <= 0 ? "error" : "success"}
            fullWidth
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
            style={{ backgroundColor: backgroundColor, color: color }}
            fullWidth
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupForm;
