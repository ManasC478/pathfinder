import { HStack, Text } from "@chakra-ui/react";

const WeightItem = ({ weight }) => {
  return (
    <HStack spacing={3}>
      <Text>{weight.id}</Text>
      <Text>{weight.size}</Text>
    </HStack>
  );
};

export default WeightItem;
