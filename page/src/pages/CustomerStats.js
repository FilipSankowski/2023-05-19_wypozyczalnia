import { Grid, Stack, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import axios from 'axios';

function WelcomeText() {
  return (
    <Stack 
    alignItems='center' 
    justifyContent='center' 
    spacing={0}
    sx={{width:'100%', margin:'0 0 3% 0'}}
    >
      <h1>Customer Statistics</h1><br/>
      <span>Check out the customers currently present in database!</span>
    </Stack>
  )
}

function CustomersTable(props) {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/getCustomers`)
    .then((res) => {setCustomerList(res.data)});
  }, []);

  const createData = (id_customer, name, surname, email) => {
    return {id_customer, name, surname, email}
  }

  const rows = customerList.map((customer) => {
    return createData(customer.id_customer, customer.name, customer.surname, customer.email);
  })

  return (
    <TableContainer component={Paper} sx={{width: '80%', margin: '0 10%'}}>
      <Table>
        <TableHead>
          <TableCell align="center" colSpan={4} sx={{fontWeight: 'bold'}}>
            Customers
          </TableCell>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">surname</TableCell>
            <TableCell align="right">email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
              key={row.id_customer}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id_customer}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.surname}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function CustomerStats() {

  return (
    <Grid container spacing={0}>
      <Grid item sm={4}>
        <WelcomeText />
      </Grid>
      <Grid item sm={8}>
        <CustomersTable />
      </Grid>
    </Grid>
  )
}