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
      <h1>Product Statistics</h1><br/>
      <span>Check out the products currently present in database!</span>
      <span>Available products in table to the left</span>
      <span>Unavailable products in the table to the right</span>
    </Stack>
  )
}

function ProductsTable(props) {
  const type = props.type;
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/getProducts/${type}`)
    .then((res) => {setProductList(res.data)});
  }, [type]);

  const createData = (id_product, name, price) => {
    return {id_product, name, price}
  }

  const rows = productList.map((product) => {
    return createData(product.id_product, product.name, product.price)
  })

  return (
    <TableContainer component={Paper} sx={{width: '80%', margin: '0 10%'}}>
      <Table>
        <TableHead>
          <TableCell align="center" colSpan={4} sx={{fontWeight: 'bold'}}>
            {type}
          </TableCell>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">price [zł]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
              key={row.id_product}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id_product}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function ProductStats() {
  
  return (
    <Grid container spacing={0}>
      <Grid item sm={12}>
        <WelcomeText />
      </Grid>
      <Grid item sm={6}>
        <ProductsTable type='available' />
      </Grid>
      <Grid item sm={6}>
        <ProductsTable type='unavailable' />
      </Grid>
    </Grid>
  )
}