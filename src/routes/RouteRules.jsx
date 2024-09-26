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
        path: '/clusters',
        name: '集群列表',
        auth: true,
        element: RouteLazyLoad(React.lazy(() => import('../pages/clusters/Clusters.jsx')))
      },
      {
        path: '/cluster',
        name: '集群管理',
        auth: true,
        children: [
          {
            path: '/cluster/overview',
            name: '集群概览',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/overview/Overview.jsx')))
          },
          {
            path: '/cluster/node',
            name: '节点管理（Node）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/node/Node.jsx')))
          },
          {
            path: '/cluster/namespace',
            name: '名称空间（Namespace）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/namespace/Namespace.jsx')))
          },
          {
            path: '/cluster/network-policy',
            name: '网络策略（Network Policy）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/network-policy/NetworkPolicy.jsx')))
          },
          {
            path: '/cluster/role',
            name: '角色（Role）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/role/NamespaceRole.jsx')))
          },
          {
            path: '/cluster/role-binding',
            name: '绑定（Role Binding）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/role-binding/NamespaceRoleBinding.jsx')))
          },
          {
            path: '/cluster/cluster-role',
            name: '集群角色（Cluster Role）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/cluster-role/ClusterRole.jsx')))
          },
          {
            path: '/cluster/cluster-role-binding',
            name: '集群绑定（Cluster Role Binding）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/cluster-role-binding/ClusterRoleBinding.jsx')))
          },
          {
            path: '/cluster/service-account',
            name: '服务账号（Service Account）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/service-account/ServiceAccount.jsx')))
          },
          {
            path: '/cluster/certificate',
            name: '集群证书（Certificate）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/cluster/certificate/Certificate.jsx')))
          }
        ]
      },
      {
        path: '/workload',
        name: '工作负载',
        auth: true,
        children: [
          {
            path: '/workload/pod',
            name: 'Pod',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/workload/pod/Pod.jsx')))
          },
          {
            path: '/workload/replica-set',
            name: '副本集（Replica Set）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/workload/replica-set/ReplicaSet.jsx')))
          },
          {
            path: '/workload/deployment',
            name: '部署（Deployment）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/workload/deployment/Deployment.jsx')))
          },
          {
            path: '/workload/daemon-set',
            name: '守护进程（Daemon Set）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/workload/daemon-set/DaemonSet.jsx')))
          },
          {
            path: '/workload/stateful-set',
            name: '有状态集（Stateful Set）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/workload/stateful-set/StatefulSet.jsx')))
          },
          {
            path: '/workload/job',
            name: '普通任务（Job）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/workload/job/Job.jsx')))
          },
          {
            path: '/workload/cron-job',
            name: '定时任务（Cron Job）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/workload/cron-job/CronJob.jsx')))
          }
        ]
      },
      {
        path: '/service',
        name: '服务发现',
        auth: true,
        children: [
          {
            path: '/service/svc',
            name: '服务（Service）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/service/service/Service.jsx')))
          },
          {
            path: '/service/ingress-class',
            name: '流量入口类（Ingress Class）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/service/ingress-class/IngressClass.jsx')))
          },
          {
            path: '/service/ingress',
            name: '流量入口（Ingress）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/service/ingress/Ingress.jsx')))
          }
        ]
      },
      {
        path: '/storage',
        name: '存储管理',
        auth: true,
        children: [
          {
            path: '/storage/class',
            name: '存储类（Storage Class）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/storage/storage-class/StorageClass.jsx')))
          },
          {
            path: '/storage/persistent-volume',
            name: '持久卷（Persistent Volume）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/storage/persistent-volume/PersistentVolume.jsx')))
          },
          {
            path: '/storage/persistent-volume-claim',
            name: '持久卷申领（Persistent Volume Claim）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/storage/persistent-volume-claim/PersistentVolumeClaim.jsx')))
          }
        ]
      },
      {
        path: '/config',
        name: '配置管理',
        auth: true,
        children: [
          {
            path: '/config/config-map',
            name: '普通配置（Config Map）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/config/config-map/ConfigMap.jsx')))
          },
          {
            path: '/config/secret',
            name: '敏感配置（Secret）',
            auth: true,
            element: RouteLazyLoad(React.lazy(() => import('../pages/config/secret/Secret.jsx')))
          }
        ]
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
      },
      {
        path: '/message',
        name: '消息通知',
        auth: true,
        element: RouteLazyLoad(React.lazy(() => import('../pages/message/Message.jsx')))
      },
      {
        path: '/help',
        name: '获取帮助',
        auth: true,
        element: RouteLazyLoad(React.lazy(() => import('../pages/help/Help.jsx')))
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
