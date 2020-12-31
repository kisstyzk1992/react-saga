import AdminHomePage from './Container/AdminHomePage/index';
import Taskboard from './Container/Taskboard';
import ProvinceManagement from './Container/ProvinceManagement/index'


export const ADMIN_ROUTES = [
    {
      name: 'Admin Page',
      path: '/',
      exact: true,
      component: AdminHomePage,
    },
    {
      name: 'Task Management',
      path: '/task-board',
      component: Taskboard,
    },
    {
      name: 'Province Management',
      path: '/province-management',
      component: ProvinceManagement
    },
  ];