import { useState, useContext, createContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const weightContext = createContext();

export function WeightProvider({ children }) {
  const weight = useWeightProvider();
  return (
    <weightContext.Provider value={weight}>{children}</weightContext.Provider>
  );
}

export const useWeight = () => {
  return useContext(weightContext);
};

const useWeightProvider = () => {
  const [weights, setWeights] = useState([]);

  const addWeight = (weight) => {
    setWeights({ ...weights, [weight.id]: weight });
    return weight;
  };
  const getWeight = (id) => {
    return weights[id];
  };
  return {
    weights,
    addWeight,
    getWeight,
  };
};
