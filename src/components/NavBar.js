import { useState } from "react";

import useAutocomplete from "../hooks/useAutocomplete";

const NavBar = ({ setAfter, setSearchTerm }) => {
  const [inputvalue, setInputValue] = useState("");

  const { suggestions, setSuggestions } = useAutocomplete(inputvalue);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(inputvalue);
    setSuggestions([]);
    setAfter("");
  }

  function handleSuggestionClick(suggestion) {
    setSearchTerm(suggestion);
    setInputValue(suggestion);
    setSuggestions([]);
  }

  return (
    <div className="header">
      <h1 className="logo">Reddit</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={inputvalue}
          onChange={(event) => setInputValue(event.target.value)}
          type="text"
          placeholder="Search here ..."
        />
        <div className="suggestions">
          {suggestions.length > 0 &&
            suggestions.map((suggestion) => (
              <div
                onClick={() => handleSuggestionClick(suggestion)}
                key={suggestion + Math.random() * Date.now()}
                tabIndex="0"
              >
                {suggestion}
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default NavBar;
