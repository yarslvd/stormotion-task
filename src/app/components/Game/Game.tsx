import {useState, useEffect, useContext} from "react";

import { SettingsContext } from "@/app/utils/createContext";
import GameClass from "@/app/data/Game";
import NumMatchesButton from "../NumMatchesButton/NumMatchesButton";

import styles from './Game.module.scss';

const Game = () => {
  const [game, setGame] = useState<any | null>(null);
  const [matchesNumber, setMatchesNumber] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [botScore, setBotScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  //Button
  const [inputValue, setInputValue] = useState<number>(1);

  const {
    firstMove,
    numMatches,
    maxNumMatchesPerMove,
  } = useContext(SettingsContext);

  useEffect(() => {
    const gameInstance = new GameClass(numMatches, firstMove, maxNumMatchesPerMove);
    setGame(gameInstance);
    updateInfo(gameInstance);
  }, []);

  const updateInfo = (instance: any): void => {
    setMatchesNumber(instance.getMatchesNumber());
    setIsPlayerTurn(instance.isPlayerTurn());
    setPlayerScore(instance.getPlayerScore());
    setBotScore(instance.getBotScore());
    setIsGameOver(instance.getIsGameOver());
  };

  const playerTurn = (matchesNumber: number): void => {
    if (game && isPlayerTurn) {
      game.makeMove(matchesNumber);
      updateInfo(game);
    }
  };

  return game && (
    <div className={styles.innerContainer}>
      <div className={styles.infoContainer}>
        <h1>📌Matches Game</h1>
        <span>🔥</span>
        <p>Matches left: {matchesNumber}</p>
      </div>

      <div className={styles.playerContainer}>
        <div className={styles.score}>
          <div className={styles.score_bot}>
            <span>AI score: {botScore}</span>
          </div>
          <div className={styles.score_player}>
            <span>Your score: {playerScore}</span>
          </div>
        </div>
        {!isGameOver && matchesNumber >= 0 && (
          <div className={styles.controlsContainer}>
            <NumMatchesButton
              inputValue={inputValue}
              setInputValue={setInputValue}
              numLeft={matchesNumber}
              maxNumMatchesPerMove={maxNumMatchesPerMove}
            />
            <button
              onClick={() => playerTurn(inputValue)}
              className={styles.takeButton}
            >
              Take
            </button>
          </div>
        )}
        {isGameOver && (
          <div className={styles.winnerContainer}>
            <span>
              {game.getWinner()}
              {game.getWinner() === "AI won" ? "😢" : "🥳"}
            </span>
            <a href="/">Play again</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
