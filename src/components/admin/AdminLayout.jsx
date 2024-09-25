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
  getItem('集群概览', '/dashboard', <DynamicIcon iconName={'DesktopOutlined'} />),
  getItem('集群管理', '51', <DynamicIcon iconName={'KubernetesOutlined'} />),
  getItem('节点管理', '55', <DynamicIcon iconName={'ClusterOutlined'} />),
  getItem('名称空间', '56', <DynamicIcon iconName={'AppstoreAddOutlined'} />),
  getItem('工作负载', '52', <DynamicIcon iconName={'DeploymentUnitOutlined'} />, [
    getItem('Pod', '521'),
    getItem('部署（Deployment）', '522'),
    getItem('守护进程（DaemonSet）', '523'),
    getItem('有状态集（StatefulSet）', '524'),
    getItem('普通任务（Job）', '525'),
    getItem('定时任务（CronJob）', '526')
  ]),
  getItem('服务发现', '57', <DynamicIcon iconName={'ApiOutlined'} />, [
    getItem('服务（Service）', '571'),
    getItem('流量入口（Ingress）', '572')
  ]),
  getItem('存储管理', '53', <DynamicIcon iconName={'HddOutlined'} />, [
    getItem('持久卷（PV）', '531'),
    getItem('持久卷申领（PVC）', '532')
  ]),
  getItem('配置管理', '54', <DynamicIcon iconName={'FileProtectOutlined'} />, [
    getItem('普通配置（ConfigMap）', '541'),
    getItem('加密配置（Secret）', '542')
  ]),
  getItem('消息通知', '98', <DynamicIcon iconName={'BellOutlined'} />),
  getItem('系统设置', '/system', <DynamicIcon iconName={'SettingOutlined'} />, [
    getItem('用户中心', '/system/user'),
    getItem('用户组别', '/system/group'),
    getItem('用户角色', '/system/role'),
    getItem('系统菜单', '/system/menu'),
    getItem('系统接口', '/system/api'),
    getItem('权限配置', '/system/permission'),
    getItem('系统设置', '/system/setting')
  ]),
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