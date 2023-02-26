export let defaultStyle = {
  backgroundColor: "white",
  color: "black",
};

let incorrectStyle = {
  backgroundColor: "#808080",
  color: "white",
};

let correctStyle = {
  backgroundColor: "#AFE1AF",
  color: "white",
};

let semiCorrectStyle = {
  backgroundColor: "#F8DE7E",
  color: "white",
};

export function getStyleByState(state) {
  if (state === 0) return incorrectStyle;
  if (state === 1) return semiCorrectStyle;
  if (state === 2) return correctStyle;
  if (state === -1) return defaultStyle;
}
