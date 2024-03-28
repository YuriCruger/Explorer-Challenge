import { ReactNode, createContext, useContext, useState } from "react";

interface SearchContextProps {
  updateSearchState: (newValue: string) => void;
  search: string;
}

interface searchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextProps | null>(null);

const SearchProvider = ({ children }: searchProviderProps) => {
  const [search, setSearch] = useState("");

  const updateSearchState = (newValue: string) => {
    setSearch(newValue);
  };

  return (
    <SearchContext.Provider value={{ updateSearchState, search }}>
      {children}
    </SearchContext.Provider>
  );
};

function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useDish must be used within an DishProvider");
  }

  return context;
}

export { SearchProvider, useSearch };
