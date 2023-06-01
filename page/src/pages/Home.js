import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';


function WelcomeText() {
  return (
    <Stack 
    alignItems='center' 
    justifyContent='center' 
    spacing={0}
    sx={{width:'100%'}}
    >
      <h1>Welcome to Car Rental Service</h1><br/>
      Complete the simple form on the right to rent your first item!
    </Stack>
  )
}

function isFormDataValid(dataObj) {
  for(const key of Object.keys(dataObj)) {
    if (!dataObj[key] || dataObj[key].length === 0) {
      return false;
    }
  }
  return true;
}

function UserForm() {
  const defaultRentData = {
    name:'',
    surname:'',
    id_product:''
  };
  const [rentData, setRentData] = useState(defaultRentData)
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    if (productList.length === 0) {
      axios.get('http://127.0.0.1:4000/getProducts/available')
      .then((res) => {setProductList(res.data)});
    }
    if (customerList.length === 0) {
      axios.get('http://127.0.0.1:4000/getCustomers')
      .then((res) => {setCustomerList(res.data)});
    }
  }, [productList.length, customerList.length]);

  const optionList = (productList.length > 0 ?
    productList.map((product) => {
      const optionText = `${product.name} - ${product.price}zł`;
      return (
        <MenuItem value={product.id_product} key={product.id_product}>
          {optionText}
        </MenuItem>
      )
    })
    : [<MenuItem value={0} key={0} disabled>
        No products available at the moment, sorry!
      </MenuItem>]
  );

  const getCustomerId = (match) => {
    for(const customer of customerList) {
      if(customer.name === match.name && customer.surname === match.surname) {
        return customer.id_customer;
      }
    }
    return false
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRentData({...rentData, [name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rentData);

    if(isFormDataValid(rentData)) {
      // Get all customers, search if in them specified exist
      // Add new user, or get his id and add rental
      const customerId = getCustomerId(rentData);
      console.log(customerId);
      if (customerId) {
        axios.post('http://127.0.0.1:4000/createRental', {
          id_product: rentData.id_product,
          id_customer: customerId
        });
      } else {
        alert('Error: user does not exist')
      }

    } else {
      alert('Error: Not every required field was filled')
    }
    
    setRentData(defaultRentData);
  }

  return (
    <Container>
      <FormControl sx={{width: '47%', margin: '0 3% 0 0'}} margin='dense'>
        <TextField 
          required
          name='name'
          label='Name'
          variant='standard'
          value={rentData.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl sx={{width: '47%', margin: '0 0 0 3%'}} margin='dense'>
        <TextField 
          required
          name='surname'
          label='Surname'
          variant='standard'
          value={rentData.surname}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl variant="standard" required margin='dense' fullWidth>
        <InputLabel id='id_product_label'>Product</InputLabel>
        <Select
          labelId='id_product_label'
          id='id_product'
          label='Product'
          name='id_product'
          value={rentData.id_product}
          onChange={handleChange}
        >
          {optionList}
        </Select>
      </FormControl>
      <FormControl margin='dense' className='trueCentered' fullWidth>
        <Button
          variant='text'
          name='submit'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </Container>
  )
}

export default function Home() {

  return (
    <Grid container spacing={0}>
      <Grid item sm={6}>
        <WelcomeText />
      </Grid>
      <Grid item sm={6}>
        <UserForm />
      </Grid>
    </Grid>
  )
}