const k8s = require('@kubernetes/client-node');
// K8s API
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);

const getLists = {
  getNodeList: (getNodeList = (req, res, next) => {
    k8sApiCore
      .listNode('default')
      .then((data) => {
        res.locals.nodeList = data;
        k8sApiCore
          .listComponentStatus()
          .then((data) => {
            res.locals.nodeList.nodeProcesses = data;
            return next();
          })
          .catch((err) => {
            res
              .status(500)
              .send(
                `error found in get request to /nodeList at listComponentStatus(), ${err}`
              );
          });
      })
      .catch((err) => {
        res
          .status(500)
          .send(`error found in get request to /nodeList at listNode, ${err}`);
      });
  }),
};

module.exports = getLists;
