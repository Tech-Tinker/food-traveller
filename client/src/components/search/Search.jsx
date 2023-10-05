import './Search.css';
import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import RecipePost from '../../components/recipepost/RecipePost';

const Result = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} />
      <div className="recipe-posts">
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <RecipePost recipe={result} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
