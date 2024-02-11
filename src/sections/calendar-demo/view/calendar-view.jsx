import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Calendar</Typography>
      </Stack>
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
