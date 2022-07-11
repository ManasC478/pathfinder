import { Box, Flex, HStack, Text, Spacer } from "@chakra-ui/react";

const Legend = () => {
  return (
    <HStack spacing={10}>
      <HStack spacing={2}>
        <Box w={8} h={8} bg='#e1e500' shadow='md' />
        <Text>Visited Nodes</Text>
      </HStack>
      <HStack spacing={2}>
        <Box w={8} h={8} bg='#00fd22' shadow='md' />
        <Text>Shortest Path Nodes</Text>
      </HStack>
      <HStack spacing={2}>
        <Box w={8} h={8} bg='#28231d' shadow='md' />
        <Text>Walls</Text>
      </HStack>
      <HStack spacing={2}>
        <Box w={8} h={8} bg='#1cffdd' shadow='md' />
        <Text>Start Node</Text>
      </HStack>
      <HStack spacing={2}>
        <Box w={8} h={8} bg='#dd1cff' shadow='md' />
        <Text>End Node</Text>
      </HStack>
    </HStack>
  );
};

export default Legend;
