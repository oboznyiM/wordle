export function getLetterId(letter) {
  return letter.charCodeAt(0) - "A".charCodeAt(0);
}

export function idToLetter(id) {
  return String.fromCharCode(id + "A".charCodeAt(0));
}

export function isAlpha(c) {
  return c.length === 1 && ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z"));
}

export function getKeyboardStyleByLetter(letter, letterState) {
  let style = {
    backgroundColor: "white",
    color: "black",
  };

  if (letterState[getLetterId(letter)] == 2) {
    style["color"] = "white";
    style["backgroundColor"] = "green";
  }
  if (letterState[getLetterId(letter)] == 1) {
    style["color"] = "white";
    style["backgroundColor"] = "yellow";
  }
  return style;
}

export function getCellStyleByLetter(letter, pos, letterState, WORD) {
  let style = {
    backgroundColor: "white",
    color: "black",
  };
  if (letter === "") return style;

  if (letter === WORD[pos]) {
    style["color"] = "white";
    style["backgroundColor"] = "green";
    return style;
  }
  for (let j = 0; j < 5; j++)
    if (letter === WORD[j]) {
      style["color"] = "white";
      style["backgroundColor"] = "yellow";
    }
  return style;
}
