import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchField = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value) {
      setFilteredData(Object.values(data));
    } else {
      const filtered = Object.entries(data).filter(([, itemValue]) =>
        itemValue.toLowerCase().includes(value.toLowerCase())
      ).map(([, itemValue]) => itemValue);

      setFilteredData(filtered);
    }
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
    />
  );
};

export default SearchField;