
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/CSSs/HomePage.css';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/shop?search=${query}`);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search for hats..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
