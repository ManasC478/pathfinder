import { Center } from "@chakra-ui/react";
import { useGrid } from "../../lib/grid";
import StartNode from "./StartNode";
import EndNode from "./EndNode";
import WeightNode from "./WeightNode";
import "../../styles/style.css";

const Node = ({
  row,
  col,
  isStart,
  isEnd,
  isVisited,
  isWall,
  previousNode,
  distance,
  weight,
}) => {
  const { handleNodeMouseDown, handleNodeMouseDrag, handleNodeMouseUp } =
    useGrid();
  return (
    <td
      id={`node-${row}-${col}`}
      className={`node ${
        isStart ? "start" : isEnd ? "end" : isWall ? "wall" : ""
      }`}
      style={{
        height: "25px",
        width: "25px",
        border: "1px solid black",
      }}
      onMouseDown={() =>
        handleNodeMouseDown(row, col, weight ? weight.id : null)
      }
      onMouseEnter={() => handleNodeMouseDrag(row, col)}
      onMouseUp={() => handleNodeMouseUp()}
    >
      <Center>
        {isStart ? (
          <StartNode />
        ) : isEnd ? (
          <EndNode />
        ) : weight ? (
          <WeightNode weight={weight} />
        ) : (
          ""
        )}
      </Center>
    </td>
  );
};

export default Node;
