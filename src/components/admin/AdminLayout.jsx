import { useEffect, useState } from 'react';
import { Avatar, Badge, Dropdown, Layout, Menu, Select } from 'antd';
import { DefaultAvatar, Logo } from '@/common/Image.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { FooterText } from '@/common/Text.jsx';
import { TreeFindPath } from '@/utils/Path.jsx';
import { RouteRules } from '@/routes/RouteRules.jsx';
import { DynamicIcon } from '@/utils/IconLoad.jsx';

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
  getItem('工作空间', '/dashboard', <DynamicIcon iconName={'DesktopOutlined'} />),
  getItem('集群列表', '/clusters', <DynamicIcon iconName={'PartitionOutlined'} />),
  getItem('集群管理', '/cluster', <DynamicIcon iconName={'KubernetesOutlined'} />, [
    getItem('集群概览', '/cluster/overview'),
    getItem('节点管理（Node）', '/cluster/node'),
    getItem('名称空间（Namespace）', '/cluster/namespace'),
    getItem('网络策略（Network Policy）', '/cluster/network-policy'),
    getItem('角色（Role）', '/cluster/role'),
    getItem('绑定（Role Binding）', '/cluster/role-binding'),
    getItem('集群角色（Cluster Role）', '/cluster/cluster-role'),
    getItem('集群绑定（Cluster Role Binding）', '/cluster/cluster-role-binding'),
    getItem('服务账号（Service Account）', '/cluster/service-account'),
    getItem('集群证书（Certificate）', '/cluster/certificate')
  ]),
  getItem('工作负载', '/workload', <DynamicIcon iconName={'DeploymentUnitOutlined'} />, [
    getItem('Pod', '/workload/pod'),
    getItem('副本集（Replica Set）', '/workload/replica-set'),
    getItem('部署（Deployment）', '/workload/deployment'),
    getItem('守护进程集（Daemon Set）', '/workload/daemon-set'),
    getItem('有状态集（Stateful Set）', '/workload/stateful-set'),
    getItem('普通任务（Job）', '/workload/job'),
    getItem('定时任务（Cron Job）', '/workload/cron-job')
  ]),
  getItem('服务发现', '/service', <DynamicIcon iconName={'ApiOutlined'} />, [
    getItem('服务（Service）', '/service/svc'),
    getItem('流量入口类（Ingress Class）', '/service/ingress-class'),
    getItem('流量入口（Ingress）', '/service/ingress')
  ]),
  getItem('存储管理', '/storage', <DynamicIcon iconName={'HddOutlined'} />, [
    getItem('存储类（Storage Class）', '/storage/class'),
    getItem('持久卷（Persistent Volume）', '/storage/persistent-volume'),
    getItem('持久卷申领（Persistent Volume Claim）', '/storage/persistent-volume-claim')
  ]),
  getItem('配置管理', '/config', <DynamicIcon iconName={'FileProtectOutlined'} />, [
    getItem('普通配置（Config Map）', '/config/config-map'),
    getItem('敏感配置（Secret）', '/config/secret')
  ]),
  getItem('系统设置', '/system', <DynamicIcon iconName={'SettingOutlined'} />, [
    getItem('用户中心', '/system/user'),
    getItem('用户组别', '/system/group'),
    getItem('用户角色', '/system/role'),
    getItem('系统菜单', '/system/menu'),
    getItem('系统接口', '/system/api'),
    getItem('权限配置', '/system/permission'),
    getItem('系统设置', '/system/setting')
  ]),
  getItem('消息通知', '/message', <DynamicIcon iconName={'BellOutlined'} />),
  getItem('获取帮助', '/help', <DynamicIcon iconName={'QuestionCircleOutlined'} />)
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
      <a target="_blank">
        消息中心<Badge size="small" count={5}></Badge>
      </a>
    ),
    key: '1'
  },
  {
    label: (
      <a target="_blank">
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
  // 菜单跳转
  const navigate = useNavigate();
  // 菜单展开收起状态
  const [collapsed, setCollapsed] = useState(false);
  // 展开和收缩菜单宽度
  const menuWidth = 230;
  const menuCollapsedWidth = 60;

  // 获取当前的请求路径，并监听该路径是否改变，如果改变则修改页面菜单数据
  const { pathname } = useLocation(); // 当前页面
  const [openKeys, setOpenKeys] = useState([pathname]); // 展开菜单，父级菜单
  const [selectedKeys, setSelectedKeys] = useState([pathname]); // 选中菜单
  useEffect(() => {
    setOpenKeys(TreeFindPath(RouteRules, data => data.path === pathname));
    setSelectedKeys(pathname);
  }, [pathname]);

  // 基础数据
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
      <Header className="admin-header">
        <div className="admin-left">
          <div className="admin-logo">
            <img className="admin-unselect" src={Logo} alt="" />
          </div>
          <div className="admin-select">
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
        <div className="admin-right">
          <Badge size="small" count={5}>
            <Dropdown menu={{
              items: dropdownMenus
            }}>
              <Avatar shape="circle" size={30}
                      src={DefaultAvatar} />
            </Dropdown>
          </Badge>
        </div>
      </Header>
      <Layout className="admin-main">
        <Sider className="admin-sider" theme="light" width={menuWidth} collapsedWidth={menuCollapsedWidth} collapsible
               collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu
            className="admin-menu"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={(key) => {
              setOpenKeys(key); // 解决展开菜单问题
            }}
            selectedKeys={selectedKeys}
            items={siderMenus}
            onClick={({ key }) => {
              console.log(key);
              navigate(key);
            }}
          />
        </Sider>
        <Layout className="admin-body">
          <Content className="admin-content">
            <Outlet />
          </Content>
          <div className="admin-footer">
            <FooterText />
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;