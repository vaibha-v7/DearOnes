import React, { createContext, useContext, useState } from 'react';

const CardCreationContext = createContext();

export function useCardCreation() {
  return useContext(CardCreationContext);
}

export function CardCreationProvider({ children }) {
  const [cardData, setCardData] = useState({
    occasion: '',
    title: '', // Corresponds to template name in schema
    recipientName: '',
    senderName: '',
    message: '',
    img: '', // Optional image URL
    isBold: false
  });

  const updateCardData = (newData) => {
    setCardData(prev => ({ ...prev, ...newData }));
  };

  const resetCardData = () => {
    setCardData({
      occasion: '',
      title: '',
      recipientName: '',
      senderName: '',
      message: '',
      img: '',
      isBold: false
    });
  };

  return (
    <CardCreationContext.Provider value={{ cardData, updateCardData, resetCardData }}>
      {children}
    </CardCreationContext.Provider>
  );
}
