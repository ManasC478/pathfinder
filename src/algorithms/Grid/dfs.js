import { getNeighbors } from "../../utils";

export const dfs = (grid, startNode, finishNode) => {
  startNode.isVisited = true;
  const visited = [];
  const stack = [startNode];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    visited.push(currentNode);
    if (currentNode === finishNode) {
      return visited;
    }

    getNeighbors(currentNode.row, currentNode.col, grid, true).forEach(
      (neighbor) => {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    );
  }

  return visited;
};
