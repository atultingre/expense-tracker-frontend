import React, { useContext } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { ColorContext } from "../../context/ColorContext/ColorContext";

const FilterTable = ({
  filterDate,
  handleChange,
  sortType,
  handleSortChange,
  handleDownload,
  handleFilterChange,
}) => {
  const colorCombination = useContext(ColorContext);
  const { backgroundColor, color } = colorCombination;

  return (
    <div className="w-full">
      <Grid container rowGap={1} spacing={1} sx={{ mb: 1, mt: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            type="month"
            label="Filter by month"
            value={filterDate}
            onChange={handleFilterChange}
            size="medium"
            color="warning"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="Sort">Sort by</InputLabel>
            <Select
              labelId="Sort"
              id="demo-simple-select"
              value={sortType}
              onChange={handleSortChange}
              label="Sort by"
              size="medium"
              color="warning"
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="dateAsc">Date Ascending</MenuItem>
              <MenuItem value="dateDesc">Date Descending</MenuItem>
              <MenuItem value="amountAsc">Amount Ascending</MenuItem>
              <MenuItem value="amountDesc">Amount Descending</MenuItem>
              <MenuItem value="titleAsc">Expenses A-Z</MenuItem>
              <MenuItem value="titleDesc">Expenses Z-A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ p: 1.7, fontWeight: 600 , mb:2}}
            onClick={handleDownload}
            style={{ backgroundColor: backgroundColor, color: color }}
            fullWidth
          >
            Excel <SimCardDownloadIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterTable;
