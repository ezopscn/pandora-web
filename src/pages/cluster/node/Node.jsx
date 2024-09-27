import { TitleSuffix } from '@/common/Text.jsx';
import { Helmet } from 'react-helmet';

const Node = () => {
  const title = '节点管理' + TitleSuffix;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className="admin-page-header">
        <div className="admin-page-title">节点管理 / NODE MANAGEMENT.</div>
        <div className="admin-page-desc">
          <div>Kubernetes 集群由 <b>控制平面（Control Plane）</b> 节点和用于运行容器化应用的 <b>工作节点（Node）</b> 组成，这些节点可以是虚拟机，也可以是物理机。不过需要注意，由于节点名称需要用来标识
            Node 对象，所以名称在集群中必须唯一。这在<a target="_blank" href="https://kubernetes.io/zh-cn/docs/concepts/architecture/">官方文档</a>中有详细的说明。不同的角色需要不同的组件支持，以下是 Kubernetes 集群的核心组件，可以简单的做个了解：
          </div>
          <ul>
            <li><b>控制平面（Control Plane）</b>：Kube-apiserver（集群所有组件交互入口）、Kube-controller-manager（负责运行管理控制器）、Kube-scheduler（负责任务调度）、Etcd（集群数据库）
            </li>
            <li><b>工作节点（Node）</b>：Kubelet（在每个 Node 上运行，类似客户端）、Kube-proxy（可选，网络代理，帮助 Service 实现网络发现）
            </li>
            <li><b>插件（Addons）</b>：DNS（非必须，为 Kubernetes 服务提供 DNS 服务），更多插件，可以参考官方<a target="_blank" href="https://kubernetes.io/zh-cn/docs/concepts/cluster-administration/addons/">插件列表</a>。
            </li>
          </ul>
        </div>
      </div>
      <div className="admin-page-main"></div>
    </>
  );
};

export default Node;