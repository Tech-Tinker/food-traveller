import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CountrySelector() {
  const [countryName, setCountryName] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    if (countryName.trim() === '') {
      setCountryList([]);
      return;
    }

    axios
      .get(`/api/verify-country?country=${countryName}`)
      .then((response) => {
        if (response.data.country_info) {
          setCountryList(response.data.country_info.place_name);
        } else {
          setCountryList([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setCountryList([]);
      });
  }, [countryName]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryName(country);
    setCountryList([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/add-country', { country_info: selectedCountry })
      .then((response) => {
        alert(response.data.message);
        // Puedes realizar cualquier otra acción después de agregar el país a la base de datos aquí.
      })
      .catch((error) => {
        console.error('Error adding country:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe el nombre del país"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <ul>
          {countryList.map((country, index) => (
            <li key={index} onClick={() => handleCountrySelect(country)}>
              {country}
            </li>
          ))}
        </ul>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CountrySelector;
