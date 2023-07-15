import { AppBar, Box, Button, Grid, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColorContext } from "../../context/ColorContext/ColorContext";

const Navbar = ({ setFilterDate, token, setToken }) => {
  const colorCombination = useContext(ColorContext);
  const { backgroundColor, color } = colorCombination;
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <Grid container xs={12}>
      <AppBar className="AppBar" position="static">
        <Toolbar style={{ backgroundColor: backgroundColor, color: color }}>
          <Box gap={1} sx={{ mr: 2 }}>
            <Link
              className="logo"
              exact
              to="/"
              onClick={() => setFilterDate("")}>
              SpendAnalyzer
            </Link>
          </Box>
          {token ? (
            <Box gap={1}>
              <Button
                variant="outlined"
                className="addButton"
                style={{ color: "white", marginRight: "10px" }}>
                <Link exact to="/add">
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
          ) : null}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
