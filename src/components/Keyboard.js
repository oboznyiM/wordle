import { getKeyboardStyleByLetter } from "../utils";

export default function Keyboard({ letterState }) {
  let letters = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  let rows = [];
  for (let i = 0; i < letters.length; i++) {
    let row = [];
    for (let j = 0; j < letters[i].length; j++) {
      row.push(
        <div
          className="cell"
          key={`SmallCell${i}-${j}`}
          style={getKeyboardStyleByLetter(letters[i][j], letterState)}
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
