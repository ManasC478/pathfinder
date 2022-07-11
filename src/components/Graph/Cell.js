import React, { useState } from "react";
import { Select, Text, VStack } from "@chakra-ui/react";
import { useMatrix } from "../../lib/matrix";

const Cell = ({ size, row, col }) => {
  const { updateWeight } = useMatrix();

  const handleUpdate = (e) => {
    updateWeight(row, col, e.target.value);
  };

  return (
    <VStack spacing={1}>
      <Select value={size} onChange={handleUpdate} variant='filled'>
        <option value={0}>0</option>
        {row !== col && (
          <>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={Infinity}>∞</option>
          </>
        )}
      </Select>
      <Text>
        {row} -{">"} {col}
      </Text>
    </VStack>
  );
};

export default Cell;
