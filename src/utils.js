export const ItemTypes = {
  START: "start",
  END: "end",
};

export const validIndices = (row, col, grid) => {
  if (row < 0 || row >= grid.length) {
    return false;
  }
  if (col < 0 || col >= grid[0].length) {
    return false;
  }
  return true;
};

export const getNeighbors = (row, col, grid, updateIsVisited) => {
  const neighbors = [];
  const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  directions.forEach((direction) => {
    const newRow = row + direction[0];
    const newCol = col + direction[1];
    if (
      validIndices(newRow, newCol, grid) &&
      grid[newRow][newCol].isVisited === false &&
      grid[newRow][newCol].isWall === false
    ) {
      if (updateIsVisited) {
        grid[newRow][newCol].isVisited = true;
      }
      neighbors.push(grid[newRow][newCol]);
    }
  });
  return neighbors;
};
