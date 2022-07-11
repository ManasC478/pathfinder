import { FiTarget, FiSend, FiChevronDown } from "react-icons/fi";
import { FaWeightHanging } from "react-icons/fa";
import { Icon } from "@chakra-ui/icons";

export const StartIcon = (props) => <Icon {...props} as={FiSend} />;
export const FinishIcon = (props) => <Icon {...props} as={FiTarget} />;
export const OpenMenuIcon = (props) => <Icon {...props} as={FiChevronDown} />;
export const WeightIcon = (props) => <Icon {...props} as={FaWeightHanging} />;
