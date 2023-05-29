import { Link, Outlet } from "react-router-dom";
import * as React from 'react';
import { Box, Button, Grid } from '@mui/material';

function NavbarButton(props) {
  return (
    <Button>
      <Link style={{textDecoration: 'none'}} to={props.to}>{props.label}</Link>
    </Button>
  )
}

export default function MainLayout() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <NavbarButton to='/' label='Home'/>
          <NavbarButton to='/adminPage' label='Admin Page'/>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  )
}