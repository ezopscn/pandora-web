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
  PartitionOutlined,
  QuestionCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';

// 图标字符串映射
// eslint-disable-next-line react-refresh/only-export-components
export const IconMap = {
  DesktopOutlined: DesktopOutlined,
  KubernetesOutlined: KubernetesOutlined,
  ClusterOutlined: ClusterOutlined,
  AppstoreAddOutlined: AppstoreAddOutlined,
  DeploymentUnitOutlined: DeploymentUnitOutlined,
  ApiOutlined: ApiOutlined,
  HddOutlined: HddOutlined,
  FileProtectOutlined: FileProtectOutlined,
  BellOutlined: BellOutlined,
  QuestionCircleOutlined: QuestionCircleOutlined,
  SettingOutlined: SettingOutlined,
  PartitionOutlined: PartitionOutlined
};

// 生成 Icon
// 用法：<DynamicIcon iconName={'DesktopOutlined'} />
// eslint-disable-next-line react/prop-types
export const DynamicIcon = ({ iconName }) => {
  const IconComponent = IconMap[iconName];
  return IconComponent ? <IconComponent /> : null;
};
