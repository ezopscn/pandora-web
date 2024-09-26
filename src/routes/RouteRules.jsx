import { Navigate, useRoutes } from 'react-router';
import React from 'react';
import RouteLazyLoad from '@/routes/RouteLazyLoad.jsx';

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
    element: RouteLazyLoad(React.lazy(() => import('../components/admin/AdminLayout.jsx'))), // 模板继承
    children: [
      {
        path: '/dashboard',
        name: '工作空间',
        auth: true,
        element: RouteLazyLoad(React.lazy(() => import('../pages/dashboard/Dashboard.jsx')))
      },
      {
        path: '/system',
        auth: true,
        children: [
          {
            path: '/system/user',
            name: '用户中心',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/user/User.jsx')))
          },
          {
            path: '/system/group',
            name: '用户组别',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/group/Group.jsx')))
          },
          {
            path: '/system/role',
            name: '用户角色',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/role/Role.jsx')))
          },
          {
            path: '/system/menu',
            name: '系统菜单',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/menu/Menu.jsx')))
          },
          {
            path: '/system/api',
            name: '系统接口',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/api/Api.jsx')))
          },
          {
            path: '/system/permission',
            name: '权限配置',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/permission/Permission.jsx')))
          },
          {
            path: '/system/setting',
            name: '系统设置',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/setting/Setting.jsx')))
          }
        ]
      }
    ]
  },
  {
    path: '/', // 错误页面入口
    auth: false,
    element: RouteLazyLoad(React.lazy(() => import('../components/error/ErrorLayout.jsx'))),
    children: [
      {
        path: '/error/403',
        name: '403',
        auth: false,
        element: RouteLazyLoad(React.lazy(() => import('../pages/error/403.jsx')))
      },
      {
        path: '/error/404',
        name: '404',
        auth: false,
        element: RouteLazyLoad(React.lazy(() => import('../pages/error/404.jsx')))
      },
      {
        path: '/error/500',
        name: '500',
        auth: false,
        element: RouteLazyLoad(React.lazy(() => import('../pages/error/500.jsx')))
      }
    ]
  },
  {
    path: '/', // 登录页面入口
    auth: false,
    element: RouteLazyLoad(React.lazy(() => import('../components/login/LoginLayout.jsx'))),
    children: [
      {
        path: '/login',
        name: '用户登录',
        auth: false,
        element: RouteLazyLoad(React.lazy(() => import('../pages/login/Login.jsx')))
      },
      {
        path: '/reset',
        name: '密码重置',
        auth: false,
        element: RouteLazyLoad(React.lazy(() => import('../pages/login/ResetPassword.jsx')))
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
