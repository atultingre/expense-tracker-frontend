import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Grid,
} from "@mui/material";

const ExpenseForm = ({ addExpense, backgroundColor, color }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      date: new Date(date),
    };
    addExpense(expense);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: "center", fontFamily: "Courgette, cursive" }}>
        Add Expense
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container rowGap={1} spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              color={title.length <= 0 ? "error" : "success"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              fullWidth
              color={amount.length <= 0 ? "error" : "success"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              fullWidth
              color={date.length <= 0 ? "error" : "success"}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ backgroundColor: backgroundColor, color: color }}>
              Add
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outlined"
              fullWidth>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ExpenseForm;
