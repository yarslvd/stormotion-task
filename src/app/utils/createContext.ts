import { createContext } from "react";

export interface ContextType {
  firstMove: string;
  setFirstMove: (value: string) => void;
  numMatches: number;
  setNumMatches: (value: number) => void;
  maxNumMatchesPerMove: number;
  setMaxNumMatchesPerMove: (value: number) => void;
  startGame: boolean;
  setStartGame: (value: boolean) => void;
}

const initialSettings: ContextType = {
  firstMove: "player",
  setFirstMove: () => {},
  numMatches: 25,
  setNumMatches: () => {},
  maxNumMatchesPerMove: 3,
  setMaxNumMatchesPerMove: () => {},
  startGame: false,
  setStartGame: () => {},
};

export const SettingsContext = createContext<ContextType>(
  initialSettings as ContextType
);
