import { Navigate, useRoutes } from 'react-router';
import ErrorLayout from '@/components/error/ErrorLayout.jsx';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import NotFoundError from '@/pages/error/404.jsx';
import ForbiddenError from '@/pages/error/403.jsx';
import ServerError from '@/pages/error/500.jsx';
import Dashboard from '@/pages/dashboard/Dashboard.jsx';
import LoginLayout from '@/components/login/LoginLayout.jsx';
import Login from '@/pages/login/Login.jsx';
import ResetPassword from '@/pages/login/ResetPassword.jsx';
import User from '@/pages/system/user/User.jsx';
import Group from '@/pages/system/group/Group.jsx';
import Role from '@/pages/system/role/Role.jsx';
import Menu from '@/pages/system/menu/Menu.jsx';
import Api from '@/pages/system/api/Api.jsx';
import Permission from '@/pages/system/permission/Permission.jsx';
import Setting from '@/pages/system/setting/Setting.jsx';

// 路由数据，参数规则：https://reactrouter.com/en/main/route/route
// 新增 auth 字段，用于校验该路由是开放路由还是需要认证才能查看的路由
// eslint-disable-next-line react-refresh/only-export-components
export const RouteRules = [
  {
    path: '/', // 入口路由
    element: <Navigate to="/dashboard" />, // 路由跳转，默认跳转到其它页面
    auth: false // 用于认证
  },
  {
    path: '/', // 后台入口
    auth: true,
    element: <AdminLayout />, // 模板继承
    children: [
      {
        path: '/dashboard',
        name: '工作空间',
        auth: true,
        element: <Dashboard />
      },
      {
        path: '/system',
        auth: true,
        children: [
          {
            path: '/system/user',
            name: '用户中心',
            auth: true,
            element: <User />
          },
          {
            path: '/system/group',
            name: '用户组别',
            auth: true,
            element: <Group />
          },
          {
            path: '/system/role',
            name: '用户角色',
            auth: true,
            element: <Role />
          },
          {
            path: '/system/menu',
            name: '系统菜单',
            auth: true,
            element: <Menu />
          },
          {
            path: '/system/api',
            name: '系统接口',
            auth: true,
            element: <Api />
          },
          {
            path: '/system/permission',
            name: '权限配置',
            auth: true,
            element: <Permission />
          },
          {
            path: '/system/setting',
            name: '系统设置',
            auth: true,
            element: <Setting />
          }
        ]
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
        name: '403',
        auth: false,
        element: <ForbiddenError />
      },
      {
        path: '/error/404',
        name: '404',
        auth: false,
        element: <NotFoundError />
      },
      {
        path: '/error/500',
        name: '500',
        auth: false,
        element: <ServerError />
      }
    ]
  },
  {
    path: '/', // 登录页面入口
    auth: false,
    element: <LoginLayout />,
    children: [
      {
        path: '/login',
        name: '用户登录',
        auth: false,
        element: <Login />
      },
      {
        path: '/reset',
        name: '密码重置',
        auth: false,
        element: <ResetPassword />
      }
    ]
  },
  {
    path: '*', // 没有匹配默认路由
    element: <Navigate to="/error/404" />,
    auth: false
  }
];

// 生成可用的路由组件
export const Routes = () => {
  return useRoutes(RouteRules);
};
