import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function Home() {
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
    : [<MenuItem value={0} key={0}>No products available</MenuItem>]
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
      <Box sx={{width:'100%'}}>
        Home
      </Box>
      <FormControl fullWidth>
        <TextField 
          required
          name='name'
          label='Name'
          variant='standard'
          value={rentData.name}
          onChange={handleChange}
          margin='dense'
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField 
          required
          name='surname'
          label='Surname'
          variant='standard'
          value={rentData.surname}
          onChange={handleChange}
          margin='dense'
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField 
          name='email'
          label='Email'
          variant='standard'
          value={rentData.email}
          onChange={handleChange}
          margin='dense'
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
      <FormControl>
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