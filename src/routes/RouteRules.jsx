import { Navigate, useRoutes } from 'react-router';
import ErrorLayout from '@/components/ErrorLayout/ErrorLayout.jsx';
import AdminLayout from '@/components/AdminLayout/AdminLayout.jsx';
import NotFoundError from '@/pages/Error/404.jsx';
import ForbiddenError from '@/pages/Error/403.jsx';
import ServerError from '@/pages/Error/500.jsx';
import Dashboard from '@/pages/Dashboard/Dashboard.jsx';

// 路由数据，参数规则：https://reactrouter.com/en/main/route/route
// 新增 auth 字段，用于校验该路由是开放路由还是需要认证才能查看的路由
export const RouteRules = [
  {
    path: '/', // 入口路由
    element: <Navigate to='/dashboard' />, // 路由跳转，默认跳转到其它页面
    auth: false // 用于认证
  },
  {
    path: '/', // 后台入口
    auth: true,
    element: <AdminLayout />, // 模板继承
    children: [
      {
        path: '/dashboard',
        auth: true,
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/', // 错误页面入口
    auth: false,
    element: <ErrorLayout />,
    children: [
      {
        path: '/error/403',
        auth: false,
        element: <ForbiddenError />
      },
      {
        path: '/error/404',
        auth: false,
        element: <NotFoundError />
      },
      {
        path: '/error/500',
        auth: false,
        element: <ServerError />
      }
    ]
  },
  {
    path: '*', // 没有匹配默认路由
    element: <Navigate to='/error/404' />,
    auth: false
  }
];

// 生成可用的路由组件
export const Routes = () => {
  return useRoutes(RouteRules);
};
