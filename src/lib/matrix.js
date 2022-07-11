import {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";

const matrixContext = createContext();
let NUM_NODES = 4;
const FLOW_WIDTH = 300;
const FLOW_HEIGHT = 500;

export function MatrixProvider({ children }) {
  const matrix = useMatrixProvider();
  return (
    <matrixContext.Provider value={matrix}>{children}</matrixContext.Provider>
  );
}

export const useMatrix = () => {
  return useContext(matrixContext);
};

const useMatrixProvider = () => {
  const [matrix, setMatrix] = useState(createMatrix([]));
  const [nodes, setNodes] = useState(createNodes([]));
  const [edges, setEdges] = useState({});

  const updateNumNodes = (n) => {
    NUM_NODES = n;
    setNodes(createNodes(nodes));
    setMatrix(createMatrix(matrix));
  };

  const updateWeight = useCallback((row, col, size) => {
    if (size === Infinity && edges.hasOwnProperty(`${row}-${col}`)) {
      const e = { ...edges };
      e[`${row}-${col}`] = undefined;
      setEdges(e);
    } else if (edges.hasOwnProperty(`${row}-${col}`)) {
      setEdges({
        ...edges,
        [`${row}-${col}`]: { ...edges[`${row}-${col}`], label: size },
      });
    } else {
      setEdges({
        ...edges,
        [`${row}-${col}`]: {
          id: `${row}-${col}`,
          source: `${row}`,
          target: `${col}`,
          label: size,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
      });
    }

    const newMatrix = matrix.slice();
    newMatrix[row][col].size = size;
    setMatrix(newMatrix);
  }, []);

  return { nodes, setNodes, edges, matrix, updateWeight, updateNumNodes };
};

const createWeight = (row, col) => {
  return { row, col, size: row === col ? 0 : Infinity };
};

const createMatrix = (matrix) => {
  const n = matrix.length;
  const newMatrix = [];
  for (let i = 0; i < NUM_NODES; i++) {
    newMatrix.push([]);
    for (let j = 0; j < NUM_NODES; j++) {
      if (i >= n || j >= n) {
        newMatrix[i].push(createWeight(i, j));
      } else {
        newMatrix[i].push(matrix[i][j]);
      }
    }
  }

  return newMatrix;
};

const createNodes = (nodes) => {
  const n = nodes.length;
  const newNodes = [];
  for (let i = 0; i < NUM_NODES; i++) {
    if (i >= n) {
      newNodes.push({
        id: `${i}`,
        type: "default",
        data: { label: `${i}` },
        position: {
          x: Math.floor(Math.random() * FLOW_WIDTH),
          y: Math.floor(Math.random() * FLOW_HEIGHT),
        },
        style: { width: 50, height: 50, borderRadius: 50 },
      });
    } else {
      newNodes.push(nodes[i]);
    }
  }
  return newNodes;
};
