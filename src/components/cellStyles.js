export let defaultStyle = {
  backgroundColor: "white",
  color: "black",
};

let incorrectStyle = {
  backgroundColor: "white",
  color: "black",
};

let correctStyle = {
  backgroundColor: "green",
  color: "white",
};

let semiCorrectStyle = {
  backgroundColor: "yellow",
  color: "white",
};

export function getStyleByState(state) {
  if (state == 0) return incorrectStyle;
  if (state == 1) return semiCorrectStyle;
  if (state == 2) return correctStyle;
}
