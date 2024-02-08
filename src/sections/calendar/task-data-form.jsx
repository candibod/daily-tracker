import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function TaskDataForm({ taskData, modelState, updateTaskData, modelClosedTrigger }) {
  const [open, setOpen] = React.useState(false);

  console.log(taskData, modelState);

  useEffect(() => {
    setOpen(modelState);
  }, [modelState]);

  const handleClose = () => {
    modelClosedTrigger();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          // const formJson = Object.fromEntries((formData as any).entries());
          // const email = formJson.email;
          console.log(formData);
          handleClose();
        },
      }}
    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

TaskDataForm.propTypes = {
  taskData: PropTypes.array,
  modelState: PropTypes.bool,
  updateTaskData: PropTypes.func,
  modelClosedTrigger: PropTypes.func,
};
