import { Helmet } from 'react-helmet-async';

import { CalendarView } from 'src/sections/calendar/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Calendar | Daily Tracker </title>
      </Helmet>

      <CalendarView />
    </>
  );
}
