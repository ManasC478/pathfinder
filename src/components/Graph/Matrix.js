import React, { useState } from "react";
import { Center, VStack } from "@chakra-ui/react";
import Cell from "./Cell";
import { useMatrix } from "../../lib/matrix";
import MatrixSlider from "./MatrixSlider";

const Matrix = () => {
  const { matrix } = useMatrix();
  return (
    <VStack spacing={5}>
      <MatrixSlider />
      <table style={{ border: "1px solid black" }}>
        <tbody style={{ padding: "20px" }}>
          {matrix.map((row, i) => (
            <tr style={{ padding: "20px" }} key={i}>
              {row.map((weight, j) => (
                <td style={{ padding: "20px" }} key={j}>
                  <Center>
                    <Cell {...weight} />
                  </Center>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </VStack>
  );
};

export default Matrix;
