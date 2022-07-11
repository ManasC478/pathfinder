import { useState } from "react";
import {
  Box,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuItem,
  Heading,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useGrid } from "../../lib/grid";
import { OpenMenuIcon, WeightIcon } from "../../styles/icons";
import Legend from "./Legend";

const MenuBar = () => {
  const {
    isAnimating,
    handleClearAnimation,
    algorithm,
    runAlgorithm,
    clearWalls,
  } = useGrid();
  const toast = useToast();
  const handleAnimate = () => {
    if (algorithm) {
      runAlgorithm();
    } else {
      toast({
        title: "Please select an algorithm",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box w='full' bg='teal.100'>
      <VStack align='flex-start' spacing={5} maxW='1200px' mx='auto' py={5}>
        <HStack spacing={16}>
          <Heading>PathFinder</Heading>
          <HStack spacing={5}>
            <AlgorithmMenu />
            {isAnimating ? (
              <Button onClick={handleClearAnimation}>Clear Visual</Button>
            ) : (
              <Button onClick={handleAnimate}>Animate</Button>
            )}
            <Button onClick={clearWalls}>Clear Walls</Button>
            <WeightMenu />
          </HStack>
        </HStack>
        <Legend />
      </VStack>
    </Box>
  );
};

const AlgorithmMenu = () => {
  const { algorithm, setAlgorithm } = useGrid();
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<OpenMenuIcon />}>
        {algorithm || "Choose an Algorithm"}
      </MenuButton>
      <MenuList minWidth='240px'>
        <MenuOptionGroup
          value={algorithm}
          type='radio'
          onChange={(value) => setAlgorithm(value)}
        >
          <MenuItemOption value='Depth First Search'>
            Depth First Search
          </MenuItemOption>
          <MenuItemOption value='Breadth First Search'>
            Breadth First Search
          </MenuItemOption>
          <MenuItemOption value='Dijkstra'>Dijkstra</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

const WeightMenu = () => {
  const toast = useToast();
  const { createWeight } = useGrid();

  const handleAddWeight = (size) => {
    const error = createWeight(size);
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<OpenMenuIcon />}>
        Add Weight
      </MenuButton>
      <MenuList minWidth='240px'>
        <MenuItem
          onClick={() => handleAddWeight(2)}
          icon={<WeightIcon boxSize={4} />}
        >
          Small Weight
        </MenuItem>
        <MenuItem
          onClick={() => handleAddWeight(7)}
          icon={<WeightIcon boxSize={5} />}
        >
          Medium Weight
        </MenuItem>
        <MenuItem
          onClick={() => handleAddWeight(12)}
          icon={<WeightIcon boxSize={6} />}
        >
          Large Weight
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuBar;
