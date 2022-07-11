import React, { useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useMatrix } from "../../lib/matrix";

const MatrixSlider = () => {
  const { updateNumNodes } = useMatrix();
  const [num, setNum] = useState(4);
  return (
    <Slider
      aria-label='slider'
      value={num}
      onChange={(value) => setNum(value)}
      onChangeEnd={(value) => updateNumNodes(value)}
      min={2}
      max={8}
      w='300px'
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb fontSize='sm' boxSize='24px' children={num} />
    </Slider>
  );
};

export default MatrixSlider;
