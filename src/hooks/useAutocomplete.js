import { useState, useEffect } from "react";

const useAutocomplete = (inputValue) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions["hello there"];
  }, [inputValue]);

  return suggestions;
};

export default useAutocomplete;
