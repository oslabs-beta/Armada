const cmd = require('node-cmd');

const clusterController = {};

clusterController.kubeConnect = (req, res, next) => {
  console.log('in kubeConnect');
  try {
    const clusterConfig = cmd.runSync('kubectl config view').data.split('\n');
    // console.log(clusterConfig);
    res.locals.clusterConfig = clusterConfig;
    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: 'Error connecting to cluster',
      message: { err: error },
    });
  }
};

module.exports = clusterController;
