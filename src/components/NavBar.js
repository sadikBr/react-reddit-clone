import { useState } from "react";

const NavBar = ({ setAfter, setSearchTerm }) => {
  const [inputvalue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(inputvalue);
    setAfter("");
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
      </form>
    </div>
  );
};

export default NavBar;
