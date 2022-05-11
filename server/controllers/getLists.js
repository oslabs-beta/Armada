const k8s = require('@kubernetes/client-node');
// K8s API
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);
// const k8sApi = kc.makeApiClient(k8s.extensions / v1beta1); // before 1.14 use extensions/v1beta1
const getLists = {
  getNodesList: (getNodesList = (req, res, next) => {
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

  getDeploymentsList: (getDeploymentsList = (req, res, next) => {
    k8sApiApps
      .listNamespacedDeployment('default')
      .then((data) => {
        res.locals.deploymentsList = data.body;
        return next();
      })
      .catch((err) =>
        next({
          log: 'error in get request to /deploymentsList',
          message: { err: 'An error occured in getLists.getDeploymentsList' },
        })
      );
  }),

  getServicesList: (getServicesList = (req, res, next) => {
    k8sApiCore
      .listNamespacedService('default')
      .then((data) => {
        res.locals.servicesList = data.body;
        return next();
      })
      .catch((err) => {
        next({
          log: 'error in get request to /serviceList',
          message: { err: err.message },
        });
      });
  }),

  getPodsList: (getPodsList = (req, res, next) => {
    k8sApiCore
      .listNamespacedPod('default')
      .then((data) => {
        res.locals.podsList = data.body;
        return next();
      })
      .catch((err) => {
        next({
          log: 'error in get request to /podList',
          message: { err: err.message },
        });
      });
  }),

  // getIngressesList: (getIngressesList = (req, res, next) => {
  //   k8sApi
  //     .listNamespacedIngress('default')
  //     .then((data) => {
  //       res.locals.ingressesList = data.body;
  //       return next();
  //     })
  //     .catch((err) => {
  //       next({
  //         log: 'error in get request to /ingressList',
  //         message: { err: err.message },
  //       });
  //     });
  // }),
};

module.exports = getLists;
