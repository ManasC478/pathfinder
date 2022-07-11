import { Center, VStack } from "@chakra-ui/react";
import React from "react";
import Flow from "./Flow";
import Matrix from "./Matrix";

const Graph = () => {
  return (
    <Center>
      <VStack spacing={5} p={5}>
        <Matrix />
        <Flow />
      </VStack>
    </Center>
  );
};

export default Graph;
