import { Grid, Stack, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import axios from 'axios';

function formatDate(badDate) {
  const date = new Date(badDate)
  const day = (date.getDate() + 1 < 10 ?
  `0${date.getDate()}`
  : `${date.getDate()}`
  );
  const month = (date.getMonth() + 1 < 10 ?
  `0${date.getMonth() + 1}`
  : `${date.getMonth() + 1}`
  );
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
}

function WelcomeText() {
  return (
    <Stack 
    alignItems='center' 
    justifyContent='center' 
    spacing={0}
    sx={{width:'100%', margin:'0 0 3% 0'}}
    >
      <h1>Rental Statistics</h1><br/>
      <span>Check out the rentals currently present in database!</span>
      <span>Pending rentals in table directly under</span>
      <span>Completed rentals in the table under the pending rentals' table</span>
    </Stack>
  )
}

function PendingRentalsTable() {
  const [rentalList, setRentalList] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/getRentals/pending`)
    .then((res) => {setRentalList(res.data)});
  }, []);

  const createData = (rental) => {
    const { id_rental, product, customer, rent_date } = rental;
    return { id_rental, product, customer, rent_date }
  }

  const rows = rentalList.map((rental) => {
    return createData(rental);
  })

  return (
    <TableContainer component={Paper} sx={{width: '80%', margin: '0 10% 5% 10%'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4} sx={{fontWeight: 'bold'}}>
              Pending
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Rent Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
              key={row.id_rental}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id_rental}
                </TableCell>
                <TableCell align="right">{row.product}</TableCell>
                <TableCell align="right">{row.customer}</TableCell>
                <TableCell align="right">{formatDate(row.rent_date)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function CompletedRentalsTable() {
  const [rentalList, setRentalList] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/getRentals/completed`)
    .then((res) => {setRentalList(res.data)});
  }, []);

  const createData = (rental) => {
    const { id_rental, product, customer, rent_date, return_date } = rental;
    return { id_rental, product, customer, rent_date, return_date }
  }

  const rows = rentalList.map((rental) => {
    return createData(rental);
  })

  return (
    <TableContainer component={Paper} sx={{width: '80%', margin: '0 10%'}}>
      <Table>
        <TableHead>
          <TableCell align="center" colSpan={5} sx={{fontWeight: 'bold'}}>
            Completed
          </TableCell>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Rent Date</TableCell>
            <TableCell align="right">Return Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
              key={row.id_rental}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id_rental}
                </TableCell>
                <TableCell align="right">{row.product}</TableCell>
                <TableCell align="right">{row.customer}</TableCell>
                <TableCell align="right">{formatDate(row.rent_date)}</TableCell>
                <TableCell align="right">{formatDate(row.return_date)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function RentalStats() {

  return (
    <Grid container spacing={0}>
      <Grid item sm={12}>
        <WelcomeText />
      </Grid>
      <Grid item sm={12}>
        <PendingRentalsTable />
      </Grid>
      <Grid item sm={12}>
        <CompletedRentalsTable />
      </Grid>
    </Grid>
  )
}