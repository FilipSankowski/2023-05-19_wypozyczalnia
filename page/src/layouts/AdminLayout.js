import { Link, Outlet } from "react-router-dom";
import * as React from 'react';
import { Box, Button, Grid } from '@mui/material';


function NavbarButton(props) {
  return (
    <Button>
      <Link to={props.to}>{props.label}</Link>
    </Button>
  )
}

export default function AdminLayout() {
  return (
    <Grid container spacing={0}>
      <Grid item sm={2}>
        <Box sx={{width: '100%', flexFlow: 'column nowrap'}}>
          <NavbarButton to='/adminPage' label='Insert Form' />
          <NavbarButton to='productStats' label='Product Stats' />
          <NavbarButton to='customerStats' label='Customer Stats' />
          <NavbarButton to='rentalStats' label='Rental Stats' />
        </Box>
      </Grid>
      <Grid item sm={10}>
        <Box sx={{width: '100%'}}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  )
}