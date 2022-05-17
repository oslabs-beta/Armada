const cmd = require('node-cmd');
const logsController = {};
const formatLogs = require('../utils/formatLogs');

const HEADERS = [
  'NAMESPACE',
  'LAST SEEN',
  'TYPE',
  'REASON',
  'OBJECT',
  'MESSAGE',
];

logsController.getLogs = (req, res, next) => {
  try {
    const rawLogs = cmd
      .runSync('kubectl get events --all-namespaces')
      .data.split('\n');
    const formattedLogs = formatLogs(rawLogs);
    res.locals.logs = formattedLogs;
    return next();
  } catch (err) {
    next({ logs: 'Error with getting logs', message: { err: err.message } });
  }
};

module.exports = logsController;
