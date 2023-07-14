import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import { saveAs } from "file-saver";
import { Container } from "@mui/material";
import SummeryTable from "./Table/SummeryTable";
import FilterTable from "./Table/FilterTable";
import ExpenseTable from "./Table/ExpenseTable";
import "./Table.css";

const ExpenseList = ({
  expenses,
  deleteExpense,
  filterDate,
  setFilterDate,
  onFilterChange,
  backgroundColor,color
}) => {
  const [sortType, setSortType] = useState(""); // Track the sort type
  const handleChange = (e) => {
    onFilterChange(e);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const sortExpenses = (data, type) => {
    const sortedData = [...data]; // Create a copy of the data array

    switch (type) {
      case "dateAsc":
        sortedData.sort((a, b) => moment(a.date) - moment(b.date));
        break;
      case "dateDesc":
        sortedData.sort((a, b) => moment(b.date) - moment(a.date));
        break;
      case "amountAsc":
        sortedData.sort((a, b) => a.amount - b.amount);
        break;
      case "amountDesc":
        sortedData.sort((a, b) => b.amount - a.amount);
        break;
      case "titleAsc":
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return sortedData;
  };

  useEffect(() => {
    setSortType("dateAsc");
  }, []);

  const filteredExpenses = filterDate
    ? expenses.filter(
        (expense) => moment(expense.date).format("YYYY-MM") === filterDate
      )
    : expenses;

  const sortedExpenses = sortExpenses(filteredExpenses, sortType);

  const todaySpent = sortedExpenses
    .filter((expense) => moment(expense.date).isSame(moment(), "day"))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const weekSpent = sortedExpenses
    .filter((expense) => moment(expense.date).isSame(moment(), "week"))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const monthSpent = sortedExpenses
    .filter((expense) => moment(expense.date).isSame(moment(), "month"))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const currentDate = moment();
  const yearStart = moment().startOf("year");
  const yearSpent = sortedExpenses
    .filter((expense) =>
      moment(expense.date).isBetween(yearStart, currentDate, "year", "[]")
    )
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalSpent = sortedExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleDownload = () => {
    const data = [
      ["Expenses Spent"],
      ["Duration", "Amount"],
      ["Today", todaySpent],
      ["Week", weekSpent],
      ["Month", monthSpent],
      ["Year", yearSpent],
      ["Total Spent", totalSpent],
      [],
      ["Date", "Expense", "Amount"],
      ...sortedExpenses.map((expense) => [
        moment(expense.date).format("DD-MM-YYYY"),
        expense.title,
        expense.amount,
      ]),
      ["Total Spent", "", totalSpent],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const excelData = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = "expenses.xlsx";
    const excelFile = new Blob([excelData], {
      type: "application/octet-stream",
    });
    saveAs(excelFile, fileName);
  };

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <Container maxWidth="md" className="w-full"  sx={{ mt: 4, mb: 4 ,minHeight:'100vh' }}>
      <SummeryTable
        todaySpent={todaySpent}
        weekSpent={weekSpent}
        monthSpent={monthSpent}
        yearSpent={yearSpent}
        totalSpent={totalSpent}
        numberWithCommas={numberWithCommas}
        // backgroundColor={backgroundColor} color={color}
      />
      <FilterTable
        filterDate={filterDate}
        expenses={expenses}
        handleChange={handleChange}
        handleFilterChange={handleFilterChange}
        sortType={sortType}
        handleSortChange={handleSortChange}
        handleDownload={handleDownload}
        backgroundColor={backgroundColor} color={color}
      />

      <ExpenseTable
        sortedExpenses={sortedExpenses}
        numberWithCommas={numberWithCommas}
        deleteExpense={deleteExpense}
        totalSpent={totalSpent}
        // backgroundColor={backgroundColor} color={color}
      />
    </Container>
  );
};

export default ExpenseList;
