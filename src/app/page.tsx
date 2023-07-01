"use client";
import { useState } from "react";
import Game from "./components/Game/Game";
import { Menu } from "./components/Menu/Menu";
import { ContextType, SettingsContext } from "./utils/createContext";

import styles from "./page.module.scss";

export default function Home() {
  const [firstMove, setFirstMove] = useState<string>('player');
  const [numMatches, setNumMatches] = useState<number>(25);
  const [maxNumMatchesPerMove, setMaxNumMatchesPerMove] = useState<number>(3);
  const [startGame, setStartGame] = useState<boolean>(false);

  const value: ContextType = {
    firstMove,
    setFirstMove,
    numMatches,
    setNumMatches,
    maxNumMatchesPerMove,
    setMaxNumMatchesPerMove,
    startGame,
    setStartGame,
  };

  return (
    <SettingsContext.Provider value={value}>
      <main className={styles.container}>
        {startGame ? <Game /> : <Menu />}
      </main>
    </SettingsContext.Provider>
  );
}
