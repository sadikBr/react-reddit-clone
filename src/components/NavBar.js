import { useState } from 'react';

import useAutocomplete from '../hooks/useAutocomplete';

const NavBar = ({ setAfter, setSearchTerm, setSortType }) => {
  const [inputvalue, setInputValue] = useState('');

  const { suggestions, setSuggestions } = useAutocomplete(inputvalue);

  const sortTypes = [
    'new',
    'hot',
    'top today',
    'top this hour',
    'top this week',
    'top this month',
    'top this year',
    'top of all time',
  ];

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(inputvalue);
    setSuggestions([]);
    setAfter('');
  }

  function handleSuggestionClick(suggestion) {
    setInputValue('');
    setSearchTerm(suggestion);
    setSuggestions([]);
    setAfter('');
  }

  function handleSortingFilter(value) {
    switch (value) {
      case 'hot':
        setSortType({
          sort: 'hot',
          t: '',
        });
        break;
      case 'new':
        setSortType({
          sort: 'new',
          t: '',
        });
        break;
      case 'top this hour':
        setSortType({
          sort: 'top',
          t: 'hour',
        });
        break;
      case 'top today':
        setSortType({
          sort: 'top',
          t: 'today',
        });
        break;
      case 'top this week':
        setSortType({
          sort: 'top',
          t: 'week',
        });
        break;
      case 'top this month':
        setSortType({
          sort: 'top',
          t: 'month',
        });
        break;
      case 'top this year':
        setSortType({
          sort: 'top',
          t: 'year',
        });
        break;
      case 'top of all time':
        setSortType({
          sort: 'top',
          t: 'all',
        });
        break;
      default:
        break;
    }
  }

  return (
    <div className='header'>
      <h1 className='logo'>Reddit</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={inputvalue}
          onChange={(event) => setInputValue(event.target.value)}
          type='text'
          placeholder='Search here ...'
        />
        <select
          className='sort-filter'
          onChange={(event) => handleSortingFilter(event.target.value)}
        >
          {sortTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <div className='suggestions'>
          {suggestions.length > 0 &&
            suggestions.map((suggestion) => (
              <div
                onClick={() => handleSuggestionClick(suggestion)}
                key={suggestion + Math.random() * Date.now()}
                tabIndex='0'
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
