import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Box, Container } from "@mui/material";
import ExpenseList from "./components/Table/ExpenseList";
import ExpenseForm from "./components/Form/ExpenseForm";
import ExpenseFormEdit from "./components/Form/ExpenseFormEdit";
import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import LoginForm from "./components/Form/LoginForm";
import SignupForm from "./components/Form/SignupForm";
import Layout from "./components/Layout/Layout";
import { BASE_URL } from "./api";
import ResetPasswordForm from "./components/Form/ResetPasswordForm";
import ColorContextProvider from "./context/ColorContext/ColorContext";

const App = () => {
  const [filterDate, setFilterDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/expenses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (token) {
      fetchExpenses();
    } else if (
      location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/reset-password"
    ) {
      // If the user is not logged in and not on the login or signup page,
      // navigate to the login page
      navigate("/login");
    }
  }, [token, navigate, location.pathname]);

  // Add Expenses
  const addExpense = async (expense) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/expenses`,
        {
          title: expense.title,
          amount: expense.amount,
          date: expense.date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExpenses([...expenses, response.data]);
      Swal.fire({
        icon: "success",
        title: "Expense Added",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding expense:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add expense",
      });
    }
  };

  // Update Expenses
  const updateExpense = async (id, updatedExpense) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/expenses/${id}`,
        updatedExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedExpenses = expenses.map((expense) =>
        expense._id === id ? response.data : expense
      );
      setExpenses(updatedExpenses);
      Swal.fire({
        icon: "success",
        title: "Expense Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating expense:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update expense",
      });
    }
  };

  // Delete Expenses
  const deleteExpense = async (id) => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: false,
      });

      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/api/expenses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedExpenses = expenses.filter(
          (expense) => expense._id !== id
        );
        setExpenses(updatedExpenses);
        Swal.fire({
          icon: "success",
          title: "Expense Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete expense",
      });
    }
  };

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/");
  };

  const handleSignup = () => {
    Swal.fire({
      icon: "success",
      title: "User registered successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/login");
  };

  return (
    <ColorContextProvider>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar
          setFilterDate={setFilterDate}
          expenses={expenses}
          token={token}
          setToken={setToken}
        />
        <Container component="main" sx={{ flexGrow: 1, mt: 4, mb: 2 }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/login"
                element={<LoginForm onLogin={handleLogin} />}
              />
              <Route
                path="/signup"
                element={<SignupForm onSignup={handleSignup} />}
              />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
              {token && (
                <Route
                  path="/add"
                  element={<ExpenseForm addExpense={addExpense} />}
                />
              )}
              {token && (
                <Route
                  path="/"
                  exact
                  element={
                    <ExpenseList
                      expenses={expenses}
                      updateExpense={updateExpense}
                      deleteExpense={deleteExpense}
                      filterDate={filterDate}
                      setFilterDate={setFilterDate}
                    />
                  }
                />
              )}
              {token && (
                <Route
                  path="/edit/:_id"
                  element={
                    <ExpenseFormEdit
                      expenses={expenses}
                      updateExpense={updateExpense}
                    />
                  }
                />
              )}
            </Route>
          </Routes>
        </Container>
        <Footer />
      </Box>
    </ColorContextProvider>
  );
};

export default App;
