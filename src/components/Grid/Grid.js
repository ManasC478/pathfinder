import { Box, HStack, VStack, Center } from "@chakra-ui/react";
import React from "react";
import Graph from "./Graph";
import WeightList from "./WeightList";
import MenuBar from "./MenuBar";

const Grid = () => {
  return (
    <Box>
      <VStack spacing={10} mb={5}>
        <MenuBar />
        <Center>
          <HStack spacing={20}>
            <Graph />
            <WeightList />
          </HStack>
        </Center>
      </VStack>
    </Box>
  );
};

export default Grid;
