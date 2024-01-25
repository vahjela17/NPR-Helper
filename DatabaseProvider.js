// DatabaseProvider.js
import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [databases, setDatabases] = useState({});

  // Functions to manage databases will be added here

  return (
    <DatabaseContext.Provider value={{ databases, setDatabases }}>
      {children}
    </DatabaseContext.Provider>
  );
};
