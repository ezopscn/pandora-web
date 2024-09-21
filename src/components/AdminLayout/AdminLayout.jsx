import { useState } from 'react';
import {
  ApiOutlined,
  AppstoreAddOutlined,
  BellOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  FileProtectOutlined,
  HddOutlined,
  KubernetesOutlined,
  QuestionCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Layout, Menu, Select } from 'antd';
import { Logo } from '@/common/Image.jsx';

const { Header, Content, Sider } = Layout;

// 生成菜单
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

// 侧边菜单
const siderMenus = [
  getItem('集群概览', '1', <DesktopOutlined />),
  getItem('集群管理', '51', <KubernetesOutlined />),
  getItem('节点管理', '55', <ClusterOutlined />),
  getItem('名称空间', '56', <AppstoreAddOutlined />),
  getItem('工作负载', '52', <DeploymentUnitOutlined />, [
    getItem('Pod', '521'),
    getItem('部署（Deployment）', '522'),
    getItem('守护进程（DaemonSet）', '523'),
    getItem('有状态集（StatefulSet）', '524'),
    getItem('普通任务（Job）', '525'),
    getItem('定时任务（CronJob）', '526')
  ]),
  getItem('服务发现', '57', <ApiOutlined />, [
    getItem('服务（Service）', '571'),
    getItem('流量入口（Ingress）', '572')
  ]),
  getItem('存储管理', '53', <HddOutlined />, [
    getItem('持久卷（PV）', '531'),
    getItem('持久卷申领（PVC）', '532')
  ]),
  getItem('配置管理', '54', <FileProtectOutlined />, [
    getItem('普通配置（ConfigMap）', '541'),
    getItem('加密配置（Secret）', '542')
  ]),
  getItem('消息通知', '98', <BellOutlined />),
  getItem('系统设置', '2', <SettingOutlined />, [
    getItem('用户中心', '21'),
    getItem('用户组别', '22'),
    getItem('用户角色', '23'),
    getItem('系统菜单', '24'),
    getItem('系统接口', '25'),
    getItem('权限配置', '26'),
    getItem('系统设置', '27')
  ]),
  getItem('获取帮助', '99', <QuestionCircleOutlined />)
];

// 下拉菜单
const dropdownMenus = [
  {
    label: 'DK / 吴彦祖',
    key: '0',
    disabled: true
  },
  {
    label: (
      <a target='_blank'>
        消息中心<Badge size='small' count={5}></Badge>
      </a>
    ),
    key: '1'
  },
  {
    label: (
      <a target='_blank'>
        个人资料
      </a>
    ),
    key: '2'
  },
  {
    type: 'divider'
  },
  {
    label: '注销登录',
    key: '3'
  }
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const namespaceData = {
    测试集群: ['kube-system', 'default', 'test'],
    生产集群: ['kube-system', 'default', 'prod']
  };
  const clusterData = ['测试集群', '生产集群'];
  const [namespaces, setNamespaces] = useState(namespaceData[clusterData[0]]);
  const [secondNamespace, setSecondNamespace] = useState(namespaceData[clusterData[0]][0]);
  const handleClusterChange = (value) => {
    setNamespaces(namespaceData[value]);
    setSecondNamespace(namespaceData[value][0]);
  };
  const onSecondNamespaceChange = (value) => {
    setSecondNamespace(value);
  };
  return (
    <Layout>
      <Header className='admin-header'>
        <div className='admin-left'>
          <div className='admin-logo'>
            <img className="admin-unselect" src={Logo} alt='' />
          </div>
          <div className='admin-select'>
            <Select
              defaultValue={clusterData[0]}
              style={{
                width: 200,
                marginRight: 10
              }}
              onChange={handleClusterChange}
              options={clusterData.map((cluster) => ({
                label: cluster,
                value: cluster
              }))}
              showSearch={true}
            />
            <Select
              style={{
                width: 200,
                marginRight: 10
              }}
              value={secondNamespace}
              onChange={onSecondNamespaceChange}
              options={namespaces.map((namespace) => ({
                label: namespace,
                value: namespace
              }))}
              showSearch={true}
            />
          </div>
        </div>
        <div className='admin-right'>
          <Badge size='small' count={5}>
            <Dropdown menu={{
              items: dropdownMenus
            }}>
              <Avatar shape='circle' size={30}
                      src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' />
            </Dropdown>
          </Badge>
        </div>
      </Header>
      <Layout className='admin-main'>
        <Sider className='admin-sider' theme='light' width={230} collapsedWidth={60} collapsible
               collapsed={collapsed}
               onCollapse={(value) => setCollapsed(value)}>
          <Menu
            className='admin-menu'
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['5']}
            items={siderMenus}
          />
        </Sider>
        <Layout className='admin-body'>
          <Content className='admin-content'>
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;