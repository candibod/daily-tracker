import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'calendar',
    path: '/calendar',
    icon: icon('ic_calendar'),
  },
  {
    title: 'Calendar demo',
    path: '/calendar-demo',
    icon: icon('ic_calendar'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
