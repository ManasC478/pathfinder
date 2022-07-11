import { getNeighbors } from "../../utils";

export const bfs = (grid, startNode, finishNode) => {
  startNode.isVisited = true;
  console.log(startNode);
  // return [];
  const visited = [];
  const queue = [startNode];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visited.push(currentNode);
    if (currentNode === finishNode) {
      return visited;
    }

    getNeighbors(currentNode.row, currentNode.col, grid, true).forEach(
      (neighbor) => {
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    );
  }
  return visited;
};
