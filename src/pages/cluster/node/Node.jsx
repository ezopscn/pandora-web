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
          <div>Kubernetes 集群由 <b>控制平面（Control
            Plane）</b> 节点和用于运行容器化应用的 <b>工作节点（Node）</b> 组成，这些节点可以是虚拟机，也可以是物理机。
          </div>
          <div>不过需要注意，由于节点名称需要用来标识 Node 对象，所以名称在集群中必须唯一。更多信息可以查看<a
            target="_blank"
            href="https://kubernetes.io/zh-cn/docs/concepts/architecture/">官方文档</a>。
          </div>
        </div>
      </div>
      <div className="admin-page-main"></div>
    </>
  );
};

export default Node;