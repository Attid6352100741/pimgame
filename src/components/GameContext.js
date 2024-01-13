// import React, { createContext, useContext, useState } from 'react';

// const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [gameState, setGameState] = useState({
//     score: 0,
//     testHistory: [],
//     round: 0,
//   });

//   return (
//     <GameContext.Provider value={{ gameState, setGameState }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

// export const useGameContext = () => {
//   const context = useContext(GameContext);

//   if (!context) {
//     throw new Error('useGameContext must be used within a GameProvider');
//   }

//   return context;
// };
