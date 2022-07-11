import Node from "./Node";
import { useGrid } from "../../lib/grid";
import { Box } from "@chakra-ui/react";

const Graph = () => {
  const { grid, isAnimating } = useGrid();

  return (
    <Box pos='relative'>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((node, j) => (
                <Node key={j} {...node} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Box
        display={isAnimating ? "block" : "none"}
        pos='absolute'
        top={0}
        w='full'
        h='full'
      ></Box>
    </Box>
  );
};

export default Graph;
