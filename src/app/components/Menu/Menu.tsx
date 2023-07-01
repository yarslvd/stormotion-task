import { useContext, useState } from "react";

import { SettingsContext } from "@/app/utils/createContext";
import styles from "./Menu.module.scss";

export const Menu: React.FC = () => {
  const {
    firstMove,
    setFirstMove,
    numMatches,
    setNumMatches,
    maxNumMatchesPerMove,
    setMaxNumMatchesPerMove,
    setStartGame,
  } = useContext(SettingsContext);

  const [error, setError] = useState('')

  const handleStart = () => {
    if(maxNumMatchesPerMove <= numMatches) {
      setError('');
      setStartGame(true);
    }
    else {
      setError('m must be equal or less to m');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>📌Matches Game</h1>
      </div>
      <div className={styles.settingsContainer}>
        <span className={styles.heading}>Settings</span>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.moveOption}>
          <label htmlFor="move">First move:</label>
          <select
            name="move"
            id="move"
            value={firstMove}
            onChange={(event) => setFirstMove(event.target.value)}
            className={styles.select}
          >
            <option value="player">You</option>
            <option value="ai">Bot</option>
          </select>
        </div>
        <div className={styles.numMatches}>
          <label htmlFor="numMatches">Number of matches in the pile - n:</label>
          <input
            type="number"
            id="numMatches"
            value={numMatches}
            onChange={(event) => setNumMatches(+event.target.value)}
          />
        </div>
        <div className={styles.numMatchesPerMove}>
          <label htmlFor="maxNumMatchesPerMove">
            Max number of matches per move - m:
          </label>
          <input
            type="number"
            id="maxNumMatchesPerMove"
            value={maxNumMatchesPerMove}
            onChange={(event) => setMaxNumMatchesPerMove(+event.target.value)}
          />
        </div>
        <button onClick={handleStart} className={styles.button}>
          Start Game
        </button>
      </div>
    </div>
  );
};
