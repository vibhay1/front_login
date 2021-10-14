import {  Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
export const Toaster = (props) => {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (

    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.data.success ? "success" : "error"}>
        {props.data.success ? props.data.message : props.data.error.message}
      </Alert>
    </Snackbar>
  )
}
