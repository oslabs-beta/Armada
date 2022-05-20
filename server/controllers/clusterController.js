const cmd = require('node-cmd');

const clusterController = {};

clusterController.kubeConnect = (req, res, next) => {
  console.log('in kubeConnect');
  try {
    const clusterConfig = cmd.runSync('kubectl config view');
    console.log(clusterConfig);
    return next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = clusterController;
