import { useState } from 'react';
import { Icon } from '@iconify/react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MyCalendarData from 'src/_mock/calender_data.json';

import DateCards from '../date-cards';
import TaskDataForm from '../task-data-form';
// ----------------------------------------------------------------------

export default function CalendarView() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [taskData, setTaskData] = useState(MyCalendarData);
  const [selectedDateTaskData, setSelectedDateTaskData] = useState({});
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const openModel = (data) => {
    setSelectedDateTaskData(data);
  };

  const updateTaskData = (data) => {
    const newTaskData = { ...taskData };
    if (Object.keys(newTaskData).indexOf(data.year) === -1) {
      newTaskData[data.year] = {};
    }

    if (Object.keys(newTaskData[data.year]).indexOf(data.month) === -1) {
      newTaskData[data.year][data.month] = {};
    }

    newTaskData[data.year][data.month][data.date] = data.tasks;

    setTaskData(newTaskData);
  };

  const updateTaskStatus = (data) => {
    const new_tasks = [];
    taskData[data.year][data.month][data.date].forEach((elem) => {
      new_tasks.push({ ...elem, status: elem.id === data.task_id ? data.status : elem.status });
    });

    const newTaskData = { ...taskData };
    newTaskData[data.year][data.month][data.date] = new_tasks;
    setTaskData(newTaskData);
  };

  const changeMonth = (direction) => {
    if (direction === 'prev') {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else if (direction === 'next') {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  return (
    <Container>
      <Grid container justifyContent="space-between" alignItems="center" flexDirection={{ xs: 'row' }} mb={5}>
        <Typography variant="h4" sx={{ order: { xs: 2, sm: 1 } }}>
          Calendar
        </Typography>
        <Grid container columnSpacing={1} alignItems="center" sx={{ order: { xs: 1, sm: 2 } }}>
          <Grid item="true">
            <IconButton onClick={() => changeMonth('prev')}>
              <Icon icon="ic:baseline-chevron-left" />
            </IconButton>
          </Grid>
          <Grid item="true" sx={{ textAlign: 'center' }}>
            {months[month]} {year.toString().slice(-2)}
          </Grid>
          <Grid item="true">
            <IconButton onClick={() => changeMonth('next')}>
              <Icon icon="ic:baseline-chevron-right" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <DateCards
        month={month}
        year={year}
        MyCalendarData={taskData}
        openModel={openModel}
        updateTaskStatus={updateTaskStatus}
      />
      <TaskDataForm taskData={selectedDateTaskData} updateTaskData={updateTaskData} />
    </Container>
  );
}
