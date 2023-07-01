import { useState, useEffect } from "react";

import styles from "./NumMatchesButton.module.scss";

interface Props {
  inputValue: number;
  setInputValue: (value: number) => void;
  numLeft: number;
  maxNumMatchesPerMove: number;
}

const NumMatchesButton: React.FC<Props> = ({ inputValue, setInputValue, numLeft, maxNumMatchesPerMove }) => {
  useEffect(() => {
    if(numLeft < maxNumMatchesPerMove) {
      setInputValue(numLeft);
    }
  }, [numLeft])

  const decrement = (): void => {
    if (inputValue > 1) {
      setInputValue(inputValue - 1);
    }
  };

  const increment = (): void => {
    const num = numLeft < maxNumMatchesPerMove ? numLeft : maxNumMatchesPerMove;
    if (inputValue < num) {
      setInputValue(inputValue + 1);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(+e.target.value);
    if (+e.target.value <= 1 || +e.target.value >= maxNumMatchesPerMove) {
      setInputValue(1);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={decrement}>
        -
      </button>
      <input
        type="number"
        className={styles.input}
        value={inputValue}
        disabled
        // onChange={handleInput}
      />
      <button className={styles.button} onClick={increment}>
        +
      </button>
    </div>
  );
};

export default NumMatchesButton;
