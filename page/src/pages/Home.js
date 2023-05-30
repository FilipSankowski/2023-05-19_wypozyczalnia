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

function UserForm() {
  const defaultRentData = {
    name:'',
    surname:'',
    email:'',
    id_product:''
  };
  const [rentData, setRentData] = useState(defaultRentData)
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    if (productArray.length === 0) {
      axios.get('http://127.0.0.1:4000/getProducts/available')
      .then((res) => {setProductArray(res.data)});
    }
  }, [productArray.length]);

  const optionList = (productArray.length > 0 ?
    productArray.map((product) => {
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRentData({...rentData, [name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rentData);
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
      <FormControl fullWidth margin='dense'>
        <TextField 
          name='email'
          label='Email'
          variant='standard'
          value={rentData.email}
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