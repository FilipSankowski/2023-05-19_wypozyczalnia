import { Box, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';

function SelectProductOptions() {
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
    : []
  );

  return optionList;
}

export default function Home() {
  const defaultRentData = {
    name:'',
    surname:'',
    email:'',
    id_product:''
  };
  const [rentData, setRentData] = useState(defaultRentData)

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setRentData({...rentData, [id]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rentData);
  }

  return (
    <Container>
      <Box sx={{width:'100%'}}>
        Home
      </Box>
      <FormControl >
        <TextField 
          required
          id='name'
          label='Name'
          variant='standard'
          value={rentData.name || ''}
          onChange={handleChange}
          margin='dense'
        />
        <TextField 
          required
          id='surname'
          label='Surname'
          variant='standard'
          value={rentData.surname || ''}
          onChange={handleChange}
          margin='dense'
        />
        <TextField 
          id='email'
          label='Email'
          variant='standard'
          value={rentData.email || ''}
          onChange={handleChange}
          margin='dense'
        />
        <Select
          id='product'
          label='Product'
          value={rentData.product || ''}
          onChange={handleChange}
        >
          <SelectProductOptions />
        </Select>
      </FormControl>
    </Container>
  )
}