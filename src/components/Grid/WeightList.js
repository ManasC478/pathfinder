import { VStack, StackDivider } from "@chakra-ui/react";
import { useWeight } from "../../lib/weight";
import WeightItem from "./WeightItem";

const WeightList = () => {
  const { weights } = useWeight();
  return (
    <VStack
      w='100px'
      shadow='md'
      border='1px solid gray.200'
      spacing={2}
      divider={<StackDivider borderColor='gray.200' />}
    >
      {Object.keys(weights).map((id) => (
        <WeightItem key={id} weight={weights[id]} />
      ))}
    </VStack>
  );
};

export default WeightList;
