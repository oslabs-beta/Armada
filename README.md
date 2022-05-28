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

### Alerts and Logs - Stay Updated on Cluster Events

The alerts page displays all Prometheus rules, filterable by group, name, status, and severity. Upon expanding a rule you can see any active alerts, along with associated descriptions. You can view event logs on the log page, filterable by type and reason.

![alerts](https://user-images.githubusercontent.com/65976862/170834672-f55e9f6d-a04c-454f-84c3-5910138ad584.gif)

## Getting Started

## Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Kubernetes-client](https://github.com/kubernetes-client/)
- [Prometheus](https://prometheus.io/)
- [Material UI](https://mui.com/)

## The Team

- Em Podhorcer [Github](https://github.com/epithe) [LinkedIn](https://www.linkedin.com/in/emily-podhorcer/)
- Jessica Lee [Github](https://github.com/frandis) [LinkedIn]
- Natalie Heller [Github](https://github.com/natwheller) [LinkedIn](https://www.linkedin.com/in/natwheller/)
- Tori Wu [Github](https://github.com/tortortor0) [LinkedIn](https://www.linkedin.com/in/victoria-y-wu/)
