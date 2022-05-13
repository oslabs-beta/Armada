const parseStatus = (nodes) => {
  const nodesObj = {};
  for (let node of nodes) {
    nodesObj[node.metadata.name] = {};
    let conditions = node.status.conditions;
    for (let condition of conditions) {
      nodesObj[node.metadata.name][condition.type] = condition.status;
    }
  }
  return nodesObj;
};
export default parseStatus;
