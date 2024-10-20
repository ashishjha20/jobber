// src/context/AmountContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context with default value 100
const AmountContext = createContext();

// Create a provider component
export const AmountProvider = ({ children }) => {
    const [amount, setAmount] = useState(100); // Initialize the amount to 100

    return (
        <AmountContext.Provider value={{ amount, setAmount }}>
            {children}
        </AmountContext.Provider>
    );
};

// Custom hook to use the AmountContext easily
export const useAmount = () => {
    const context = useContext(AmountContext);
    if (!context) {
        throw new Error("useAmount must be used within an AmountProvider");
    }
    return context;
};
