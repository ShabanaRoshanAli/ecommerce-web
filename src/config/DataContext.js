import React, {
  createContext,
  useContext,
  useState
} from "react";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [dataFromCategoryCard, setDataFromCategoryCard] = useState(null);
  return (
    <DataContext.Provider
      value={{
        dataFromCategoryCard,
        setDataFromCategoryCard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
