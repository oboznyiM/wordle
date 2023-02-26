import { useState } from "react";
import Keyboard from "./Keyboard";
import "./styles.css";
import useKeypress from "../useKeypress";
import { getLetterId, isAlpha, getCellStyleByLetter } from "../utils";
import { getCellStatus } from "./getCellStatus";
import { defaultStyle, getStyleByState } from "./cellStyles";
const MAXWORDS = 6;
let WON = false;
const WORD = "HELLO";

function processAlpha(words, setWords, key) {
  key = key.toUpperCase();
  let pos = 0;
  while (pos < words.length && words[pos][0].length === 5) {
    pos++;
  }
  let newWords = [...words];
  if (pos !== newWords.length) {
    newWords[newWords.length - 1][0] += key;
    setWords(newWords);
  }
}

function updateLetterState(word, letterState, setLetterState) {
  let newLetterState = [...letterState];
  let states = getCellStatus(word, WORD);
  for (let i = 0; i < word.length; i++) {
    newLetterState[getLetterId(word[i])] = Math.max(
      newLetterState[getLetterId(word[i])],
      states[i]
    );
  }
  setLetterState(newLetterState);
}

function animateWin(words, pos, letterState, setLetterState) {
  WON = true;
  updateLetterState(words[pos][0], letterState, setLetterState);
  alert("YOU WON");
}

function processEnter(words, setWords, letterState, setLetterState) {
  let pos = words.length - 1;
  if (words[pos][0].length !== 5) return;
  words[pos][1] = true;
  if (words.length < MAXWORDS) {
    words.push(["", false]);
  }
  setWords(words);
  if (words[pos][0] === WORD) {
    animateWin(words, pos, letterState, setLetterState);
  }
  updateLetterState(words[pos][0], letterState, setLetterState);
}

function processBackspace(words, setWords) {
  let pos = words.length - 1;
  if (words[pos][1] === true || words[pos][0].length == 0) return;
  let word = words[pos][0];
  let newWords = [...words];
  newWords[pos][0] = word.substring(0, word.length - 1);
  setWords(newWords);
}

export default function App() {
  const [words, setWords] = useState([["", false]]);
  const [letterState, setLetterState] = useState(Array(26).fill(0));
  useKeypress((key) => {
    if (WON) return;
    if (isAlpha(key)) {
      processAlpha(words, setWords, key);
    }
    if (key === "Backspace") {
      processBackspace(words, setWords, key);
    }
    if (key === "Enter") {
      processEnter(words, setWords, letterState, setLetterState);
    }
  }, []);

  let rows = [];
  for (let i = 0; i < MAXWORDS; i++) {
    let row = [];
    for (let j = 0; j < 5; j++) {
      let letter =
        words.length > i && words[i][0].length > j ? words[i][0][j] : "";
      let states = [];
      if (i < words.length && words[i][1]) {
        states = getCellStatus(words[i][0], WORD);

        console.log(states);
      }
      row.push(
        <div
          className="cell"
          key={`Cell${i}-${j}`}
          style={states.length > 0 ? getStyleByState(states[j]) : defaultStyle}
        >
          {letter}
        </div>
      );
    }
    rows.push(
      <div className="row" key={`Row${i}`}>
        {row}
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
