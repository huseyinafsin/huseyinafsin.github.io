import { Typography } from '@mui/material';
import * as React from 'react';
import { Alert } from 'react-bootstrap';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });

export default function Error404() {
  // const classes = useStyles();
  return <div className="a">
      <Typography variant="h4">
      Shhhhhh! This page is not found  🥹👉👈 
      </Typography>
    <Alert severity="error"></Alert>

  </div>;
}