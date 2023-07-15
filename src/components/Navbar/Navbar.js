import { AppBar, Grid, Select, Toolbar, MenuItem, Button, Box } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColorContext } from "../../context/ColorContext/ColorContext";
import Swal from "sweetalert2";

const Navbar = ({ setFilterDate, token, setToken }) => {
  const colorCombination = useContext(ColorContext);
  const { backgroundColor, color } = colorCombination;
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setToken(null);
        navigate("/login");
      }
    });
  };

  return (
    <AppBar className="AppBar" position="static">
      <Toolbar style={{ backgroundColor: backgroundColor, color: color }}>
        <Grid container xs={12} spacing={1} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Box display="flex" alignItems="center">
              <Link
                className="logo"
                exact
                to="/"
                onClick={() => setFilterDate("")}
              >
                SpendAnalyzer
              </Link>
              {token && (
                <Grid
                  container
                  item
                  xs={12}
                  sm={9}
                  md={6}
                  alignItems="center"
                  display={{ xs: "flex", sm: "none" }} // Show only in small mobile screen
                >
                  <Select
                    value="Add Expense"
                    size="small"
                    inputProps={{ "aria-label": "Select" }}
                    style={{ color: "white", border: "none" }}
                  >
                    <MenuItem
                      value="Add Expense"
                      disabled
                      style={{ display: "none" }}
                    >
                      Add Expense
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/add"
                      style={{ color: "black" }}
                    >
                      Add Expense
                    </MenuItem>
                    <MenuItem component="button" onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </Select>
                </Grid>
              )}
            </Box>
          </Grid>
          {token && (
            <Grid
              container
              item
              xs={12}
              sm={9}
              md={6}
              alignItems="center"
              display={{ xs: "none", sm: "flex" }} // Show only in tablet and larger screens
              justifyContent="flex-end"
            >
              <Grid item xs={3} sm={4}>
                <Button
                  variant="outlined"
                  className="addButton"
                  style={{ color: "white" }}
                  component={Link}
                  to="/add"
                >
                  Add Expense
                </Button>
              </Grid>
              <Grid item xs={3} sm={2}>
                <Button
                  variant="outlined"
                  className="addButton"
                  style={{ color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
