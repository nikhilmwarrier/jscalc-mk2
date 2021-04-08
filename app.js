document.body.addEventListener("click", () => {
  document.getElementById("input").focus();
});

const calc = new MathCalc();

document.getElementById("exp-input").addEventListener("submit", e => {
  e.preventDefault();
  let inputField = document.getElementById("input");
  if (inputField.value !== "") {
    let result = calc.parse(inputField.value);
    if (result.error) {
      pushOutput(inputField.value, "ERROR: " + result.error.text);
    } else if (result.eval() == undefined) {
      pushOutput(inputField.value, "ERROR");
    } else if (isNaN(result.eval())) {
      pushOutput(
        inputField.value,
        "ERROR: Only valid numbers can be operated upon"
      );
    } else {
      pushOutput(inputField.value, result.eval());
    }
  }

  inputField.value = "";
});

function pushOutput(qn, ans) {
  let res = document.createElement("p");
  res.innerHTML = `
  <span class="input">${qn}</span> <br />
  <span class="output">${ans}</span>
  `;

  const output = document.getElementById("output");
  output.appendChild(res);

  output.scrollTop = output.scrollHeight;
}

document.getElementById("clear").addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("output").innerHTML = "";
});
