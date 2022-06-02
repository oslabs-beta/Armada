![Armada Logo](./assets/Logo.png?raw=true)

# Armada

A light-weight Kubernetes health monitoring tool.

## Summary

Armada is an open-source tool for monitoring the health of your Kubernetes cluster. It features a dashboard which delivers an at-a-glance overview of the status of your cluster. It also features a metrics page to view time-series data of your cluster's performance, and an alerts page and logs page to stay on top of any events that may arise.

## Features

### Dashboard - Easily Assess and Diagnose Cluster Health

The homepage dashboard provides a comprehensive and easily digestible overview of your cluster health and performance. It shows overall cluster resource usage, cluster statistics, and node and pod statuses. It also features charts tracking the most resource-intensive nodes and pods in your cluster. All data across the application is filterable by namespace.

![homepage](https://user-images.githubusercontent.com/65976862/170833541-6d25fddd-6c65-4b40-8fa8-70576b4b28a1.gif)

### Metrics - In-Depth View of Cluster Performance

The metrics page displays a curated selection of time-series data regarding your cluster. You can view CPU usage, memory usage, and network data for namespaces, nodes, and pods. Not seeing the information you're looking for? Simply go to the custom query page and submit your query to see customized time-series charts.

![metrics](https://user-images.githubusercontent.com/65976862/170834565-8c23d13a-9114-436c-b7ea-7237ddc25fcd.gif)

### Custom Metrics - Create a Custom View of Your Cluster Metrics

For additional flexibility, the custom metrics page allows users to select from over 800 Prometheus Queries to generate time-series charts with custom inputs for time range, step, and namespace.

![custom](https://user-images.githubusercontent.com/100235225/171661130-87519aa0-8d4c-4b30-a04f-e4d42339723e.gif)

### Alerts and Logs - Stay Updated on Cluster Events

The alerts page displays all Prometheus rules, filterable by group, name, status, and severity. Upon expanding a rule you can see any active alerts, along with associated descriptions. You can view event logs on the log page, filterable by type and reason.

![alerts](https://user-images.githubusercontent.com/65976862/170834672-f55e9f6d-a04c-454f-84c3-5910138ad584.gif)

## Getting Started

### 1. Prerequisites

Before you start with Armada, make sure you have a configured and running Kubernetes cluster and Prometheus. You can find detailed instructions on how to set this up [here](https://github.com/marcel-dempers/docker-development-youtube-series/tree/master/monitoring/prometheus/kubernetes/1.23).

### 2. Clone this repo

Run this command in your terminal:

```
git clone git@github.com:oslabs-beta/Armada.git
```

### 3. Install dependencies and start the app

Run these commands from within the root directory:

```
npm install
npm run build
npm run start
```

### 4. Port-forward Prometheus to 9090

To port-forward Prometheus, run the following command, replacing the terms in brackets with the namespace and service name.

```
kubectl port-forward -n <namespace> svc/<service name> 9090
```

### 5. Start using Armada!

Go to http://localhost:3001/ and enjoy your new k8s experience!

## Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Redux](https://redux.js.org/)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Kubernetes-client](https://github.com/kubernetes-client/)
- [Prometheus](https://prometheus.io/)
- [Material UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/)

## The Team

- Em Podhorcer [Github](https://github.com/epithe) [LinkedIn](https://www.linkedin.com/in/emily-podhorcer/)
- Jessica Lee [Github](https://github.com/frandis) [LinkedIn](https://www.linkedin.com/in/jessica-lee-790a283b/)
- Natalie Heller [Github](https://github.com/natwheller) [LinkedIn](https://www.linkedin.com/in/natwheller/)
- Tori Wu [Github](https://github.com/tortortor0) [LinkedIn](https://www.linkedin.com/in/victoria-y-wu/)
