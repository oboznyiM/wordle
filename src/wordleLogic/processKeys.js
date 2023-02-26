import { getCellStates } from "./cellStates";
import { getLetterId } from "../utils";

function updateLetterState(word, letterState, setLetterState, WORD) {
  let newLetterState = [...letterState];
  console.log(WORD);
  let states = getCellStates(word, WORD);
  for (let i = 0; i < word.length; i++) {
    newLetterState[getLetterId(word[i])] = Math.max(
      newLetterState[getLetterId(word[i])],
      states[i]
    );
  }
  setLetterState(newLetterState);
}

export function processAlpha(words, setWords, key, WORD) {
  key = key.toUpperCase();
  let pos = 0;
  while (pos < words.length && words[pos][0].length === WORD.length) {
    pos++;
  }
  let newWords = [...words];
  if (pos !== newWords.length) {
    newWords[newWords.length - 1][0] += key;
    setWords(newWords);
  }
}

function animateWin(
  words,
  pos,
  letterState,
  setLetterState,
  WON,
  setWON,
  WORD
) {
  setWON(true);
  console.log(WORD);
  updateLetterState(words[pos][0], letterState, setLetterState, WORD);
  alert("YOU WON");
}

function animateLose() {
  alert("You Lost");
}

export function processEnter(
  words,
  setWords,
  letterState,
  setLetterState,
  WON,
  setWON,
  WORD,
  MAXWORDS
) {
  let pos = words.length - 1;
  if (words[pos][0].length !== WORD.length) return;
  words[pos][1] = true;

  setWords(words);
  console.log("ENTER: ", WORD);
  if (words[pos][0] === WORD) {
    animateWin(words, pos, letterState, setLetterState, WON, setWON, WORD);
  }
  if (words.length < MAXWORDS) {
    words.push(["", false]);
  } else {
    animateLose();
  }
  updateLetterState(words[pos][0], letterState, setLetterState, WORD);
}

export function processBackspace(words, setWords) {
  let pos = words.length - 1;
  if (words[pos][1] === true || words[pos][0].length === 0) return;
  let word = words[pos][0];
  let newWords = [...words];
  newWords[pos][0] = word.substring(0, word.length - 1);
  setWords(newWords);
}
