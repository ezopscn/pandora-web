const Namespace = () => {
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title">名称空间 / NAMESPACE.</div>
        <div className="admin-page-desc">
          <div>在 Kubernetes
            中，名称空间（Namespace）提供一种机制，将同一集群中的资源划分为相互隔离的组。同一名称空间内的资源名称要唯一，但跨名称空间时没有这个要求。
          </div>
          <div>Kubernetes 启动时会创建四个初始名称空间：<b>default、kube-system、kube-public、kube-node-lease</b>，更多信息可以查看<a
            target="_blank"
            href="https://kubernetes.io/zh-cn/docs/concepts/overview/working-with-objects/namespaces/">官方文档</a>。
          </div>
        </div>
      </div>
      <div className="admin-page-main"></div>
    </>
  );
};

export default Namespace;