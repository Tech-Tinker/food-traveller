import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import Nav from '../../components/nav/Nav';


const Result = () => {
  let [searchResults, setSearchResults] = useState([]);

  let handleSearch = async (results) => {
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
      <Nav />
    </div>
  );
};

export default Result;
