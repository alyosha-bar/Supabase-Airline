// UserContext.js
import React, { useState, createContext } from 'react';
 
const UserContext = createContext();


//create the custom provider to use the context
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};



export { UserProvider, UserContext };