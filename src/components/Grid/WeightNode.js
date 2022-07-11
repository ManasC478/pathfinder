import { WeightIcon } from "../../styles/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  PopoverAnchor,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const WeightNode = ({ weight }) => {
  //   const handleEdit = (value) => {
  //     weight.size = value;
  //   };
  return (
    // <Popover>
    //   <PopoverTrigger>
    <span>
      <WeightIcon boxSize={weight.size > 10 ? 5 : weight.size >= 5 ? 4 : 3} />
    </span>
    //   </PopoverTrigger>
    //   <Portal>
    //     <PopoverContent>
    //       <PopoverArrow />
    //       <PopoverBody>
    //         <NumberInput
    //           defaultValue={weight.size}
    //           min={1}
    //           max={15}
    //           onChange={handleEdit}
    //         >
    //           <NumberInputField />
    //           <NumberInputStepper>
    //             <NumberIncrementStepper />
    //             <NumberDecrementStepper />
    //           </NumberInputStepper>
    //         </NumberInput>
    //       </PopoverBody>
    //     </PopoverContent>
    //   </Portal>
    // </Popover>
  );
};

export default WeightNode;
