import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import Grid from "./Grid/Grid";
import Graph from "./Graph/Graph";

import { GridProvider } from "../lib/grid";
import { WeightProvider } from "../lib/weight";
import { MatrixProvider } from "../lib/matrix";

const Container = () => {
  return (
    <Tabs>
      <Center>
        <TabList>
          <Tab>Grid</Tab>
          <Tab>Graph</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel p={0}>
          <WeightProvider>
            <GridProvider>
              <Grid />
            </GridProvider>
          </WeightProvider>
        </TabPanel>
        <TabPanel p={0}>
          {/* <MatrixProvider>
            <Graph />
          </MatrixProvider> */}
          <Center>
            <Heading>Under Development</Heading>
          </Center>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Container;
