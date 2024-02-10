import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

export default function DateCards({ month, year, MyCalendarData, openModel }) {
  const [task_data, setTaskData] = useState([]);

  useEffect(() => {
    function generate_date_data(date, month_calculated, year_calculated, is_selected_month = false) {
      return {
        id: `${date.toString()}_${(month_calculated + 1).toString()}`,
        date,
        month: month_calculated + 1,
        year: year_calculated,
        is_selected_month,
        data: get_task_data(date, month_calculated, year_calculated),
      };
    }

    function get_task_data(date, month_calculated, year_calculated) {
      if (
        Object.keys(MyCalendarData).indexOf(year.toString()) >= 0 &&
        Object.keys(MyCalendarData[year]).indexOf(month_calculated.toString()) >= 0 &&
        Object.keys(MyCalendarData[year][month_calculated]).indexOf(date.toString()) >= 0 &&
        MyCalendarData[year_calculated][month_calculated][date].length >= 1
      ) {
        return MyCalendarData[year_calculated][month_calculated][date];
      }

      return [];
    }

    if (month === -1 || year === -1) return;
    const dates_info = [];
    const start_of_month = new Date(year, month, 1);
    const first_day_of_month = start_of_month.getDay();
    const last_date_of_month = new Date(year, month + 1, 0).getDate();

    // Add prev month dates
    if (first_day_of_month !== 0) {
      const previous_month = month === 0 ? 11 : month - 1;
      const previous_year = month === 0 ? year - 1 : year;
      const last_date_of_last_month = new Date(previous_year, previous_month + 1, 0).getDate();

      let i = 0;
      while (i < first_day_of_month) {
        dates_info.push(
          generate_date_data(last_date_of_last_month - first_day_of_month + 1 + i, previous_month, previous_year)
        );
        i += 1;
      }
    }

    // Add Selected month dates
    let j = 1;
    while (j <= last_date_of_month) {
      dates_info.push(generate_date_data(j, month, year, true));
      j += 1;
    }

    // Add Next month dates
    const last_day_of_month = new Date(year, month + 1, 0).getDay();
    if (last_day_of_month !== 6) {
      let counter = 1;
      while (counter < 7 - last_day_of_month) {
        dates_info.push(generate_date_data(counter, month + 1, year));
        counter += 1;
      }
    }

    setTaskData(dates_info);
  }, [MyCalendarData, month, year]);

  const openTaskDataModel = (event, post) => {
    openModel({
      date: post.date.toString(),
      month: (post.month - 1).toString(),
      year: post.year.toString(),
      data: post.data,
    });
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{
        borderTop: 'rgb(218,220,224) 1px solid',
        borderLeft: 'rgb(218,220,224) 1px solid',
      }}
    >
      {task_data.map((post) => (
        <Grid
          key={post.id}
          xs={12}
          sm={6}
          md={12 / 7}
          sx={{
            p: 0,
            ...(!post.is_selected_month && {
              color: '#aaa',
            }),
            borderBottom: 'rgb(218,220,224) 1px solid',
            borderRight: 'rgb(218,220,224) 1px solid',
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Grid
              sx={{
                paddingLeft: 1,
              }}
            >
              {post.date}
            </Grid>
            <Grid container columnSpacing={1}>
              <Grid>
                {post.data.length <= 2 && (
                  <IconButton onClick={(event) => openTaskDataModel(event, post)}>
                    <Icon icon="mdi:add-circle-outline" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
          {post.data.length > 0 && (
            <Paper elevation={2} sx={{ marginLeft: 1 }}>
              {post.data.map((task) => (
                <div>{task.name}</div>
              ))}
            </Paper>
          )}
        </Grid>
      ))}
    </Grid>
  );
}

DateCards.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  MyCalendarData: PropTypes.object,
  openModel: PropTypes.func,
};
