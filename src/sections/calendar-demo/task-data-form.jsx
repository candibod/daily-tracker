import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function TaskDataForm({ taskData, updateTaskData }) {
  const [tasks, setTasks] = useState([]);
  const [modelState, setModelState] = useState(false);

  useEffect(() => {
    if (Object.keys(taskData).length > 0) {
      const new_tasks = [];
      taskData.data.forEach((elem) => {
        new_tasks.push({ ...elem, editing_enabled: false });
      });
      setTasks(new_tasks);
      setModelState(true);
    }
  }, [taskData]);

  const addNewTask = () => {
    const new_tasks = [
      ...tasks,
      {
        id: Object.keys(tasks).length + 1,
        name: '',
        type: 'checkbox',
        order: 0,
        status: 'dnf',
        editing_enabled: true,
      },
    ];
    setTasks(new_tasks);
  };

  const editTask = (task_id) => {
    const new_tasks = [];
    tasks.forEach((elem) => {
      new_tasks.push({ ...elem, editing_enabled: elem.id === task_id ? true : elem.editing_enabled });
    });
    setTasks(new_tasks);
  };

  const saveTask = (event) => {
    event.preventDefault();
    const new_task_data = [];
    tasks.forEach((elem) => {
      new_task_data.push({
        id: elem.id,
        name: elem.name,
        type: elem.type,
        order: elem.order,
        status: elem.status,
      });
    });
    taskData.tasks = new_task_data;
    updateTaskData(taskData);
    handleClose();
  };

  const handleInputChange = (event, task_id) => {
    const new_tasks = [];
    tasks.forEach((elem) => {
      new_tasks.push({ ...elem, name: elem.id === task_id ? event.target.value : elem.name });
    });
    setTasks(new_tasks);
  };

  const handleClose = () => {
    setModelState(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={modelState}
      onClose={handleClose}
      onSubmit={(event) => saveTask}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          saveTask(event);
          handleClose();
        },
      }}
    >
      <DialogTitle>Manage Tasks</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ paddingBottom: 1 }}>
          Click on <b>add new</b> to add tasks & select the input type
        </DialogContentText>
        {tasks &&
          Object.keys(tasks).length > 0 &&
          tasks.map((task) =>
            task.editing_enabled ? (
              <Grid key={task.id} container spacing={3}>
                <Grid xs>
                  <Select
                    value="checkbox"
                    label="Age"
                    size="small"
                    // onChange={handleChange}
                  >
                    <MenuItem value="checkbox">CheckBox</MenuItem>
                    <MenuItem value="text">Text</MenuItem>
                  </Select>
                </Grid>
                <Grid xs={6}>
                  <TextField
                    variant="outlined"
                    defaultValue={task.name}
                    type="text"
                    size="small"
                    onChange={(event) => handleInputChange(event, task.id)}
                    fullWidth
                  />
                </Grid>
                <Grid xs>
                  <IconButton aria-label="edit">
                    <Icon icon="mdi:delete-outline" />
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              <Grid key={task.id} container spacing={3}>
                <Grid xs>
                  <FormControl disabled>
                    <Select id="demo-simple-select-disabled" size="small" value="checkbox">
                      <MenuItem value="checkbox">CheckBox</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={6}>
                  <TextField disabled size="small" defaultValue={task.name} fullWidth />
                </Grid>
                <Grid xs>
                  <IconButton aria-label="edit" onClick={() => editTask(task.id)}>
                    <Icon icon="mdi:edit-outline" />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <Icon icon="mdi:delete-outline" />
                  </IconButton>
                </Grid>
              </Grid>
            )
          )}
        <Button variant="contained" onClick={addNewTask} sx={{ marginTop: 1 }} startIcon={<Icon icon="mdi:note-add" />}>
          Add Task
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

TaskDataForm.propTypes = {
  taskData: PropTypes.object,
  updateTaskData: PropTypes.func,
};
