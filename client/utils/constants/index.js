/** TODO: Make sure all bar charts import MAX_SERIES from this file and remove actions/constants/chartConstants.js */
export const MAX_SERIES = 5;

export const POD_STATUS = {
  Pending:
    'The pod is waiting to get scheduled on a node, or for at least one of its containers to initialize.',
  Running:
    'The pod has been assigned to a node and has one or more running containers.',
  Succeeded: 'All of the pod’s containers exited without errors.',
  Failed: 'One or more of the pod’s containers terminated with an error.',
  Unknown:
    'Usually occurs when the Kubernetes API server could not communicate with the pod’s node.',
};
