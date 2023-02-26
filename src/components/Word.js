import { getStyleByState, defaultStyle } from "../wordleLogic/cellStyles";
import { getCellStates } from "../wordleLogic/cellStates";

export default function Word({ word, WORD }) {
  let row = [];
  for (let j = 0; j < WORD.length; j++) {
    let letter = word[0].length > j ? word[0][j] : "";
    let states = [];
    if (word[1]) {
      states = getCellStates(word[0], WORD);
    }
    row.push(
      <div
        className="cell"
        key={`Cell${word}-${j}`}
        style={states.length > 0 ? getStyleByState(states[j]) : defaultStyle}
      >
        {letter}
      </div>
    );
  }
  return row;
}
