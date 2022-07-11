import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";
import { useMatrix } from "../../lib/matrix";

const Flow = () => {
  const { nodes, setNodes, edges } = useMatrix();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  return (
    <div style={{ height: 500, width: 900 }}>
      <ReactFlow
        nodes={nodes}
        edges={Object.values(edges)}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        fitView
        style={{ background: "#d7e2e8" }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Flow;
