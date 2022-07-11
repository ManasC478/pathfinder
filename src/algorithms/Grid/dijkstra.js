import { getNeighbors } from "../../utils";

export const dijkstra = (grid, startNode, finishNode) => {
  startNode.distance = 0;
  const visited = [];
  const reachedNodes = [startNode];

  while (reachedNodes.length > 0) {
    const minNode = findMinDist(reachedNodes);
    minNode.isVisited = true;
    visited.push(minNode);
    if (minNode === finishNode) {
      return { visited, reachedNodes };
    }
    getNeighbors(minNode.row, minNode.col, grid, false).forEach((neighbor) => {
      let weight;
      if (!neighbor.weight) {
        weight = 0;
      } else {
        weight = neighbor.weight.size;
      }
      if (neighbor.distance > minNode.distance + weight) {
        neighbor.distance = minNode.distance + weight;
        neighbor.previousNode = minNode;
      }
      reachedNodes.push(neighbor);
    });
  }

  return { visited, reachedNodes };
};

const findMinDist = (reachedNodes) => {
  let min = Infinity;
  let i;
  reachedNodes.forEach((node, index) => {
    if (node.distance < min && !node.isVisited) {
      min = node.distance;
      i = index;
    }
  });

  return reachedNodes.splice(i, 1)[0];
};
