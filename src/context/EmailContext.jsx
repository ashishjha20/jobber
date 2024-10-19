import React, { createContext, useState } from "react";

// Create the context
export const EmailContext = createContext();

// Create a provider component
export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState(null);

  return (
    <EmailContext.Provider value={{ emails, setEmails }}>
      {children}
    </EmailContext.Provider>
);
};