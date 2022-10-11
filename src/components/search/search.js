import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_URL, goeApiOtions } from "../api";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      goeApiOtions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
      <AsyncPaginate
        placeholder="Search for City"
        debounceTimeout={500}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}

export default Search;
