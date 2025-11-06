const VALID_INPUT_REGEX =
  /^(?!.*(?<!\*)[+\-/^]{2})(?!.*\*\*{2,})(?![+\-*/^])(?!.*[+\-*/^]$)(?!.*\([+\-*/^])(?!.*\/0+(?!\.))(?!.*\(\s*\))(?:(?:\d+)|(sin|cos|tan|sqrt|log|pow)\([^()]+\)|[+\-*/^]|\(|\))*$/i;

let finalExpres = "";
let history = new Array();

(function () {
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      if (event.target.value == "equal") {
        calculate(finalExpres);
        return;
      }

      if (event.target.value == "clear") {
        finalExpres = "";
        setScreenValue("");
        clearDisplayResult();
        return;
      }

      finalExpres += event.target.value;
      setScreenValue(finalExpres);
    });
  });
})();

function handleInputChange(event) {
  finalExpres = event.target.value;
  setScreenValue(finalExpres);
}

function setScreenValue(value) {
  document.querySelector(".screen").value = value;
  inputValidator(value);
}

function calculate(expr) {
  if (!expr) {
    alert("Invalid character or expression");
    return;
  }

  if (inputValidator(expr)) {
    const calculatedResult = eval(inputValidator(expr));
    displayResult(calculatedResult);
    addToHistory(expr, calculatedResult);
    displayHistory(history);
  } else {
    alert("Invalid character or expression");
  }
}

function inputValidator(input) {
  if (VALID_INPUT_REGEX.test(input)) {
    const converted = input.replace(
      /\b(sin|cos|tan|sqrt|log|pow)\(/gi,
      "Math.$1("
    );
    // exponentHandler(converted)
    return converted;
  } else return false;
}
function displayResult(result) {
  document.querySelector(".result-screen").value = result;
}

function clearDisplayResult() {
  document.querySelector(".result-screen").value = "";
}

function addToHistory(expr, result) {
  history.push({ expr: expr, result: result });
  console.log(history);
}

function displayHistory(historyRow) {
  let historydiv = document.querySelector(".history");
  historydiv.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
    historydiv.innerHTML += `<p onclick=setHistoryToDisplay(${i})>${history[i].expr}=${history[i].result}</p><button class="delete" onclick=deleteHistoryItem(${i})>Delete</buttom>`;
  }
}

function deleteHistoryItem(index) {
  history.splice(index, 1);
  displayHistory(history);
}

function setHistoryToDisplay(index) {
  setScreenValue(history[index].expr);
  finalExpres = history[index].expr;
  displayResult(history[index].result);
}
