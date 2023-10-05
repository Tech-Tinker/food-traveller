import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import RecipePost from '../../components/recipepost/RecipePost'; 

const Result = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} />
      <div className="recipe-posts">
        {searchResults.map((result) => (
          <RecipePost key={result.id} recipe={result} />
        ))}
      </div>
    </div>
  );
};

export default Result;
