import { useState, useContext, createContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dfs, bfs, dijkstra } from "../algorithms/Grid";
import { useWeight } from "./weight";
import { useToast } from "@chakra-ui/react";

const gridContext = createContext();
let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let END_NODE_ROW = 10;
let END_NODE_COL = 35;
const NUM_ROWS = 30;
const NUM_COLS = 50;

export function GridProvider({ children }) {
  const grid = useGridProvider();
  return <gridContext.Provider value={grid}>{children}</gridContext.Provider>;
}

export const useGrid = () => {
  return useContext(gridContext);
};

const useGridProvider = () => {
  const toast = useToast();
  const { addWeight, getWeight } = useWeight();
  const grid = useRef(initializeGrid());
  const visitedNodes = useRef([]);
  const [isMouseDown, setIsMouseDown] = useState({
    down: false,
    item: null,
    id: null,
  });
  const [algorithm, setAlgorithm] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNodeMouseDown = (row, col, id = null) => {
    setIsMouseDown(true);
    const className = document.getElementById(`node-${row}-${col}`).className;
    if (className.includes("start")) {
      setIsMouseDown({ down: true, item: "start", id });
      return;
    } else if (className.includes("end")) {
      setIsMouseDown({ down: true, item: "end", id });
      return;
    } else if (className.includes("weight")) {
      setIsMouseDown({ down: true, item: "weight", id });
      return;
    }
    setIsMouseDown({ down: true, item: "wall", id });
    createOrRemoveWall(grid, row, col);
  };

  const handleNodeMouseDrag = (row, col) => {
    if (!isMouseDown.down) return;
    if (isMouseDown.item === "start") {
      if (
        grid.current[row][col].isEnd ||
        grid.current[row][col].isWall ||
        grid.current[row][col].weight
      )
        return;
      moveStartOrEndNode(
        grid.current,
        START_NODE_ROW,
        START_NODE_COL,
        row,
        col,
        "start"
      );
    } else if (isMouseDown.item === "end") {
      if (
        grid.current[row][col].isStart ||
        grid.current[row][col].isWall ||
        grid.current[row][col].weight
      )
        return;
      moveStartOrEndNode(
        grid.current,
        END_NODE_ROW,
        END_NODE_COL,
        row,
        col,
        "end"
      );
    } else if (isMouseDown.item === "weight") {
      if (
        grid.current[row][col].isStart ||
        grid.current[row][col].isEnd ||
        grid.current[row][col].isWall ||
        grid.current[row][col].weight
      )
        return;
      const weight = getWeight(isMouseDown.id);
      moveStartOrEndNode(
        grid.current,
        weight.row,
        weight.col,
        row,
        col,
        "weight"
      );
    } else {
      createOrRemoveWall(grid, row, col);
    }
  };

  const handleNodeMouseUp = () => {
    setIsMouseDown({ down: false, item: null, id: null });
  };

  const clearWalls = () => {
    toggleOffWall(grid.current);
  };

  const handleClearAnimation = () => {
    toggleOffAnimation(
      grid.current,
      visitedNodes.current,
      grid.current[END_NODE_ROW][END_NODE_COL]
    );
    setIsAnimating(false);
  };

  const runAlgorithm = () => {
    switch (algorithm) {
      case "Breadth First Search":
        visitedNodes.current = bfs(
          grid.current,
          grid.current[START_NODE_ROW][START_NODE_COL],
          grid.current[END_NODE_ROW][END_NODE_COL]
        );
        break;
      case "Depth First Search":
        visitedNodes.current = dfs(
          grid.current,
          grid.current[START_NODE_ROW][START_NODE_COL],
          grid.current[END_NODE_ROW][END_NODE_COL]
        );
        break;
      case "Dijkstra":
        const { visited, reachedNodes } = dijkstra(
          grid.current,
          grid.current[START_NODE_ROW][START_NODE_COL],
          grid.current[END_NODE_ROW][END_NODE_COL]
        );
        resetDistance(visited, reachedNodes);
        visitedNodes.current = visited;
        break;
      default:
        break;
    }
    const shortestPathNodes = getShortestPath(
      grid.current[END_NODE_ROW][END_NODE_COL]
    );
    if (shortestPathNodes.length === 1) {
      toast({
        title: "Path not found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      handleClearAnimation();
      return;
    }
    setIsAnimating(true);
    toggleOnAnimation(visitedNodes.current, shortestPathNodes);
  };

  const createWeight = (size) => {
    const id = uuidv4();
    setIsMouseDown({ down: true, item: "weight", id });
    for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
      const row = Math.ceil(Math.random() * NUM_ROWS);
      const col = Math.ceil(Math.random() * NUM_COLS);
      if (
        grid.current[row][col].isWall ||
        grid.current[row][col].isStart ||
        grid.current[row][col].isEnd ||
        grid.current[row][col].weight
      )
        continue;
      grid.current[row][col].weight = addWeight({
        id,
        size,
        row,
        col,
      });
      document.getElementById(`node-${row}-${col}`).classList.add("weight");
      setIsMouseDown({ down: false, item: null, id: null });
      return;
    }
    setIsMouseDown({ down: false, item: null, id: null });
    return "No cells available";
  };

  return {
    grid: grid.current,
    isAnimating,
    setIsAnimating,
    algorithm,
    setAlgorithm,
    handleNodeMouseDown,
    handleNodeMouseDrag,
    handleNodeMouseUp,
    handleClearAnimation,
    runAlgorithm,
    clearWalls,
    createWeight,
  };
};

const initializeGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    grid.push([]);
    for (let col = 0; col < NUM_COLS; col++) {
      grid[row].push(createNode(row, col));
    }
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    weight: null,
  };
};

const createOrRemoveWall = (grid, row, col) => {
  const className = document.getElementById(`node-${row}-${col}`).className;
  if (
    className.includes("start") ||
    className.includes("end") ||
    className.includes("weight")
  ) {
    return;
  }
  grid.current[row][col].isWall = !grid.current[row][col].isWall;
  document.getElementById(`node-${row}-${col}`).classList.toggle("wall");
};

const toggleOffWall = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col].isWall) {
        grid[row][col].isWall = false;
        document.getElementById(`node-${row}-${col}`).classList.remove("wall");
      }
    }
  }
};

const toggleOnAnimation = (visitedNodes, shortestPathNodes) => {
  for (let i = 0; i <= visitedNodes.length; i++) {
    if (i === visitedNodes.length) {
      setTimeout(() => {
        toggleOnAnimateShortestPath(shortestPathNodes);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodes[i];
      document
        .getElementById(`node-${node.row}-${node.col}`)
        .classList.add("visited");
    }, i * 10);
  }
};

const toggleOnAnimateShortestPath = (shortestPathNodes) => {
  for (let i = 0; i < shortestPathNodes.length; i++) {
    setTimeout(() => {
      const node = shortestPathNodes[i];
      document
        .getElementById(`node-${node.row}-${node.col}`)
        .classList.add("shortest-path");
    }, 10 * i);
  }
};

const toggleOffAnimation = (grid, visitedNodes, endNode) => {
  let currentNode = endNode;
  while (currentNode) {
    document
      .getElementById(`node-${currentNode.row}-${currentNode.col}`)
      .classList.remove("shortest-path");
    currentNode = currentNode.previousNode;
  }

  visitedNodes.forEach((node) => {
    grid[node.row][node.col].isVisited = false;
    grid[node.row][node.col].previousNode = null;
    document
      .getElementById(`node-${node.row}-${node.col}`)
      .classList.remove("visited");
  });
};

const getShortestPath = (endNode) => {
  const shortestPathNodes = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    shortestPathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPathNodes;
};

const moveStartOrEndNode = (grid, oldRow, oldCol, newRow, newCol, item) => {
  if (item === "start") {
    grid[oldRow][oldCol].isStart = false;
    grid[newRow][newCol].isStart = true;
    START_NODE_ROW = newRow;
    START_NODE_COL = newCol;
  } else if (item === "end") {
    grid[oldRow][oldCol].isEnd = false;
    grid[newRow][newCol].isEnd = true;
    END_NODE_ROW = newRow;
    END_NODE_COL = newCol;
  } else if (item === "weight") {
    const weight = grid[oldRow][oldCol].weight;
    weight.row = newRow;
    weight.col = newCol;
    grid[oldRow][oldCol].weight = null;
    grid[newRow][newCol].weight = weight;
  }
  document.getElementById(`node-${oldRow}-${oldCol}`).classList.remove(item);
  document.getElementById(`node-${newRow}-${newCol}`).classList.add(item);
};

const resetDistance = (visited, reachedNodes) => {
  visited.forEach((node) => {
    if (node.distance !== Infinity) {
      node.distance = Infinity;
    }
  });
  reachedNodes.forEach((node) => {
    if (node.distance !== Infinity) {
      node.distance = Infinity;
    }
  });
};
