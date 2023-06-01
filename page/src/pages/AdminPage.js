import React from 'react';
import { Container, Grid, Tabs, Tab, Typography, Box, FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function isFormDataValid(dataObj) {
  for(const key of Object.keys(dataObj)) {
    if (!dataObj[key] || dataObj[key].length === 0) {
      return false;
    }
  }
  return true;
}

function AddProductForm() {
  const defaultFormData = {
    name:'',
    price:''
  };
  const [formData, setFormData] = useState(defaultFormData)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if(isFormDataValid(formData)) {
      // Code if data is valid
    } else {
      alert('Error: Not every required field was filled')
    }
    
    setFormData(defaultFormData);
  }

  return (
    <Container>
      <FormControl sx={{width: '47%', margin: '0 3% 0 0'}} margin='dense'>
        <TextField 
          required
          name='name'
          label='Name'
          variant='standard'
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl sx={{width: '47%', margin: '0 0 0 3%'}} margin='dense'>
        <TextField 
          required
          name='price'
          label='Price'
          variant='standard'
          type='number'
          value={formData.price}
          onChange={handleChange}
        />
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

function AddCustomerForm() {
  const defaultFormData = {
    name:'',
    surname:''
  };
  const [formData, setFormData] = useState(defaultFormData)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if(isFormDataValid(formData)) {
      // Code if data is valid
    } else {
      alert('Error: Not every required field was filled')
    }
    
    setFormData(defaultFormData);
  }

  return (
    <Container>
      <FormControl sx={{width: '47%', margin: '0 3% 0 0'}} margin='dense'>
        <TextField 
          required
          name='name'
          label='Name'
          variant='standard'
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl sx={{width: '47%', margin: '0 0 0 3%'}} margin='dense'>
        <TextField 
          required
          name='surname'
          label='Surname'
          variant='standard'
          value={formData.surname}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl fullWidth margin='dense'>
        <TextField 
          name='email'
          label='Email'
          variant='standard'
          value={formData.email || ''}
          onChange={handleChange}
        />
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

function CompleteRentalForm() {
  const defaultFormData = {
    id_rental:''
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [rentalList, setRentalList] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/getRentals')
    .then((res) => {setRentalList(res.data)});
  }, []);

  const optionList = (rentalList.length > 0 ?
    rentalList.map((rental) => {
      const optionText = `${rental.product} -> ${rental.customer}`;
      return (
        <MenuItem value={rental.id_rental} key={rental.id_rental}>
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
    setFormData({...formData, [name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if(isFormDataValid(formData)) {
      // Code if data is valid
    } else {
      alert('Error: Not every required field was filled')
    }
    
    setFormData(defaultFormData);
  }

  return (
    <Container>
      <FormControl variant="standard" required margin='dense' fullWidth>
        <InputLabel id='id_rental_label'>Rental</InputLabel>
        <Select
          labelId='id_rental_label'
          id='id_rental'
          label='Rental'
          name='id_rental'
          value={formData.id_rental}
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

function AdminForms() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add Product" {...a11yProps(0)} />
          <Tab label="Add Customer" {...a11yProps(1)} />
          <Tab label="Complete Rental" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddProductForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddCustomerForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CompleteRentalForm />
      </TabPanel>
    </Box>
  );
}

export default function AdminPage() {
  return (
    <Grid container spacing={0}>
      <Grid item sm={12}>
        <AdminForms />
      </Grid>
    </Grid>
  )
}