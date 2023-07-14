import { AppBar, Box, Button, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  setFilterDate,
  expenses,
  backgroundColor,
  color,
  token,
  setToken,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <Grid container>
      <AppBar className="AppBar" position="static">
        <Toolbar style={{ backgroundColor: backgroundColor, color: color }}>
          <Grid item xs={7}>
            <Link
              className="logo"
              exact
              to="/"
              onClick={() => setFilterDate("")}>
              SpendAnalyzer
            </Link>
          </Grid>
          <Grid item xs={5}>
            {token ? (
              <Box gap={1}>
                <Button
                  variant="outlined"
                  className="addButton"
                  style={{ color: "white", marginRight:'10px' }}>
                  <Link exact to="/add" >
                    Add Expense
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  className="addButton"
                  style={{ color: "white" }}
                  onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Box gap={1}>
                <Button
                  variant="outlined"
                  className="addButton"
                  style={{ color: "white" , marginRight:'10px'}}>
                  <Link exact to="/login">
                    Login
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  className="addButton"
                  style={{ color: "white" }}>
                <Link exact to="/signup">
                  Signup
                </Link>
                </Button>
              </Box>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
