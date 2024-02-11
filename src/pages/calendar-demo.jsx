import { Helmet } from 'react-helmet-async';

import { CalendarView } from 'src/sections/calendar-demo/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Calendar | Minimal UI </title>
      </Helmet>

      <CalendarView />
    </>
  );
}
