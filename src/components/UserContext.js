import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedScore = parseInt(localStorage.getItem('score'), 10);

    if (storedUser) {
      setUser(storedUser);
    }

    if (!isNaN(storedScore)) {
      setScore(storedScore);
    }
  }, []);

  const login = (id, username , firstname , lastname , personid , roll) => {
    const newUser = { id, username, firstname , lastname , personid , roll ,image: null };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const updateScore = (newScore) => {
    setScore(newScore);
    localStorage.setItem('score', newScore.toString());
  };

  return (
    <UserContext.Provider value={{ user, score, login, updateUser, updateScore }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
