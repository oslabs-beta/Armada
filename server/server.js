const express = require('express');
const client = require('prom-client');

const path = require('path');

const getLists = require('./controllers/getLists');

const PORT = process.env.PORT || 3001;
const app = express();

// Collect default metrics using Prom API
client.collectDefaultMetrics();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/fetchMetrics', async (req, res) => {
  console.log(client.collectDefaultMetrics.metricsList);
  const metrics = await client.register.getMetricsAsJSON();
  res.status(200).json(metrics);
});

app.get('/nodesList', getLists.getNodesList, (req, res) => {
  console.log('Num Nodes', res.locals.nodeList.response.body.items.length);
  console.log(res.locals.nodeList.response.body);
  console.log(
    'Nodes names',
    res.locals.nodeList.response.body.items
      .map((el) => el.metadata.name)
      .join(', ')
  );

  res.status(201).send(res.locals.nodeList);
});
app.get('/deploymentsList', getLists.getDeploymentsList, (req, res) => {
  res.status(201).send(res.locals.deploymentsList);
});
app.get('/podsList', getLists.getPodsList, (req, res) => {
  res.status(201).send(res.locals.podsList);
});

app.get('/servicesList', getLists.getServicesList, (req, res) => {
  res.status(201).send(res.locals.servicesList);
});

// app.get('/ingressesList', getLists.getIngressesList, (req, res) => {
//   res.status(201).send(res.locals.ingressesList);
// });

app.get(['/', '/metrics', '/custom', '/alerts'], (req, res) => {
  res.status(201).sendFile(path.join(__dirname, '../index.html'));
});

// Global route handler
app.use('*', (req, res) => {
  console.log('Page not found.');
  return res.status(404).send('Page not found.');
});

// Global error handler
app.use(defaultErrorHandler);
function defaultErrorHandler(err, req, res, next) {
  const defaultErr = {
    log: 'Error! at the Disco',
    status: 400,
    message: {
      err: "An error occurred somewhere where it isn't being handled",
    },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
}

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
