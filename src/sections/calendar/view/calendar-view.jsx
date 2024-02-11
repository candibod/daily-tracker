import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MyCalendarData from 'src/_mock/calender_data.json';

import DateCards from '../date-cards';
import TaskDataForm from '../task-data-form';
// ----------------------------------------------------------------------

export default function CalendarView() {
  const [month, setMonth] = useState(-1);
  const [year, setYear] = useState(-1);
  const [taskData, setTaskData] = useState(MyCalendarData);
  const [selectedDateTaskData, setSelectedDateTaskData] = useState({});

  useEffect(() => {
    if (month === -1 || year === -1) {
      const now = new Date();
      setMonth(now.getMonth());
      setYear(now.getFullYear());
    }
  }, [month, year]);

  const openModel = (data) => {
    setSelectedDateTaskData(data);
  };

  const updateTaskData = (data) => {
    const newTaskData = { ...taskData };
    if (Object.keys(MyCalendarData).indexOf(data.year) === -1) {
      newTaskData[data.year] = {};
    }

    if (Object.keys(MyCalendarData[data.year]).indexOf(data.month) === -1) {
      newTaskData[data.year][data.month] = {};
    }

    newTaskData[data.year][data.month][data.date] = data.tasks;

    setTaskData(newTaskData);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Calendar</Typography>
      </Stack>
      <DateCards month={month} year={year} MyCalendarData={taskData} openModel={openModel} />
      <TaskDataForm taskData={selectedDateTaskData} updateTaskData={updateTaskData} />
    </Container>
  );
}
