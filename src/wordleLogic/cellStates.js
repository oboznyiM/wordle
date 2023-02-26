import { getLetterId, idToLetter } from "../utils";

export function getCellStates(word, WORD) {
  let letterStates = Array(26).fill(0);
  for (let i = 0; i < 26; i++) {
    let letter = idToLetter(i);

    ///check green
    let isGreen = true;
    let existsInGuess = false,
      existsInWord = false;
    for (let i = 0; i < WORD.length; i++) {
      if (word[i] === letter) existsInGuess = true;
      if (WORD[i] === letter) existsInWord = true;
    }
    for (let i = 0; i < WORD.length; i++) {
      if (WORD[i] === letter && word[i] !== letter) isGreen = false;
    }
    if (isGreen && existsInWord) {
      letterStates[i] = 2;
      continue;
    }

    ///check yellow

    if (existsInGuess && existsInWord) {
      letterStates[i] = 1;
    }
  }

  let cntLetters = Array(26).fill(0);
  for (let i = 0; i < WORD.length; i++) cntLetters[getLetterId(WORD[i])]++;

  let states = Array(WORD.length).fill(0);
  for (let i = 0; i < word.length; i++) {
    if (letterStates[getLetterId(word[i])] === 2) {
      if (word[i] === WORD[i]) {
        states[i] = 2;
      } else {
        states[i] = 0;
      }
      continue;
    }
    if (letterStates[getLetterId(word[i])] === 0) {
      states[i] = 0;
      continue;
    }

    ///state 1
    if (cntLetters[getLetterId(word[i])] > 0) {
      cntLetters[getLetterId(word[i])]--;
      states[i] = 1;
    } else {
      states[i] = 0;
    }
  }
  return states;
}
