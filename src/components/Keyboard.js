import { getStyleByState } from "../wordleLogic/cellStyles";
import { getLetterId } from "../utils";
import "./styles.css";

export default function Keyboard({ letterState }) {
  let letters = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  let rows = [];
  for (let i = 0; i < letters.length; i++) {
    let row = [];
    for (let j = 0; j < letters[i].length; j++) {
      row.push(
        <div
          className="cell small"
          key={`SmallCell${i}-${j}`}
          style={getStyleByState(letterState[getLetterId(letters[i][j])])}
        >
          {letters[i][j]}
        </div>
      );
    }
    rows.push(
      <div className="row" key={`KeyRow${i}`}>
        {row}
      </div>
    );
  }
  return <div className="keyboard">{rows}</div>;
}
