import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import Search from '../../components/search/Search';

const Result = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;

