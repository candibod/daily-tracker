import { Icon } from '@iconify/react';
import EditorJS from '@editorjs/editorjs';
import Checklist from '@editorjs/checklist';
import NestedList from '@editorjs/nested-list';
import { ref, set, onValue } from 'firebase/database';
import { useRef, useState, useEffect, useContext, useCallback } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DateCards from '../date-cards';
import TaskDataForm from '../task-data-form';
import { database } from '../../../auth/firebase';
import { AuthContext } from '../../../auth/AuthProvider';
// ----------------------------------------------------------------------

export default function CalendarView() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [taskData, setTaskData] = useState({});
  const [selectedDateTaskData, setSelectedDateTaskData] = useState({});
  const { user } = useContext(AuthContext);
  const editorData = useRef({});
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const editorInstance = useRef(null);
  const getTaskData = useCallback(() => {
    if (user) {
      if (Object.keys(taskData).length > 0) return;
      const starCountRef = ref(database, `users/${user.uid}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTaskData(data.tasks);
          if (editorInstance.current === null) {
            initEditor(data.editorData);
            editorInstance.current = '';
          }
        }
      });
    }
  }, [user, taskData]);

  const initEditor = (savedData) => {
    const editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Start Typing Here...!',
      tools: {
        list: {
          class: NestedList,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
      },
      onChange: async () => {
        const content = await editor.saver.save();
        editorData.current = content;
      },
      data: savedData,
    });
  };

  useEffect(() => {
    getTaskData();
  }, [getTaskData, month, year]);

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
    set(ref(database, `users/${user.uid}`), newTaskData);

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

    set(ref(database, `users/${user.uid}/tasks`), newTaskData);
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

  const saveContent = () => {
    set(ref(database, `users/${user.uid}/editorData`), editorData.current);
  };

  return (
    <Container maxWidth={false}>
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
        updateTaskData={updateTaskData}
      />
      <TaskDataForm taskData={selectedDateTaskData} updateTaskData={updateTaskData} />
      <div className="editor">
        <div id="editor" />
        <Button onClick={() => saveContent()} variant="outlined">
          Save
        </Button>
      </div>
    </Container>
  );
}
