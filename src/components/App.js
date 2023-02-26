import { useState } from "react";
import Keyboard from "./Keyboard";
import "./styles.css";
import Word from "./Word";
import useKeypress from "../hooks/useKeypress";
import { isAlpha } from "../utils";
import {
  processAlpha,
  processBackspace,
  processEnter,
} from "../wordleLogic/processKeys";
const MAXWORDS = 6;
const WORD = "HELLO";

export default function App() {
  const [words, setWords] = useState([["", false]]);
  const [letterState, setLetterState] = useState(Array(26).fill(-1));
  const [WON, setWON] = useState(false);
  useKeypress((key) => {
    if (WON) return;
    if (isAlpha(key)) {
      processAlpha(words, setWords, key);
    }
    if (key === "Backspace") {
      processBackspace(words, setWords, key);
    }
    if (key === "Enter") {
      processEnter(
        words,
        setWords,
        letterState,
        setLetterState,
        WON,
        setWON,
        WORD,
        MAXWORDS
      );
    }
  }, []);

  let rows = [];
  for (let i = 0; i < MAXWORDS; i++) {
    rows.push(
      <div className="row" key={`Row${i}`}>
        <Word word={words.length > i ? words[i] : ["", 0]} WORD={WORD} />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="words">{rows}</div>
      <Keyboard letterState={letterState} />
    </div>
  );
}
