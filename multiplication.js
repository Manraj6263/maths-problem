let num1, num2;

function generateQuestion() {
    let MultiplicandInput = document.getElementById("Multiplicand").value;
    let MultiplierInput = document.getElementById("Multiplier").value;

    if (!MultiplicandInput || !MultiplierInput || parseInt(MultiplicandInput) <= 0 || parseInt(MultiplierInput) <= 0) {
        return;
    }

    num1 = parseInt(MultiplicandInput);
    num2 = parseInt(MultiplierInput);

    document.getElementById("num1").innerText = num1;
    document.getElementById("num2").innerText = num2;
    document.getElementById("result").innerText = "";

    let stepsBox = document.getElementById("steps");
    let finalAnswerBox = document.getElementById("finalAnswer");
    stepsBox.innerHTML = "";
    finalAnswerBox.innerHTML = "";

    let num2str = num2.toString().split("").reverse();
    let Multiplicandstr = num1.toString();

    let CorrectSteps = [];
    let totalSum = 0;

    for (let i = 0; i < num2str.length; i++) {
        let MultiplierDigit = parseInt(num2str[i]);
        let partialProduct = num1 * MultiplierDigit;
        let shiftedProduct = partialProduct * Math.pow(10, i);
       
    }

    // Create input boxes for multiplication steps
    for (let i = 0; i < CorrectSteps.length; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("step-row");
        let productStr = CorrectSteps[i].toString().padStart(Multiplicandstr.length + i, 'X');

        for (let j = productStr.length - 1; j >= 0; j--) {
            let char = productStr[j] === 'X' ? '' : productStr[j];
            rowDiv.prepend(createInputBox(char));
        }
        stepsBox.appendChild(rowDiv);
    }

    // Create input boxes for final sum
    let totalStr = totalSum.toString();
    let sumRowDiv = document.createElement("div");
    sumRowDiv.classList.add("step-row", "final-row");

    for (let i = totalStr.length - 1; i >= 0; i--) {
        sumRowDiv.prepend(createInputBox(totalStr[i]));
    }
    finalAnswerBox.appendChild(sumRowDiv);
}

// ✅ Move `createInputBox()` outside `generateQuestion()`
function createInputBox(correctValue) {
    let inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.classList.add("step-input");
    inputBox.dataset.correct = correctValue;
    inputBox.maxLength = 1;
   
    inputBox.onfocus = function() { this.select(); };  // Auto-select on focus

    // Auto move focus to the left (previous input) for RTL behavior
    inputBox.addEventListener("input", function() {
        if (this.value.length === 1) {
            let prev = this.previousElementSibling;  // Move focus to previous box
            if (prev) prev.focus();
        }
    });

    return inputBox;
}

function checkAnswer() {
    let stepInputs = document.querySelectorAll(".step-input");
    let correctSteps = [...stepInputs].map(input => input.dataset.correct);
    let userSteps = [...stepInputs].map(input => input.value.trim());

    let resultElement = document.getElementById("result");
    let allCorrect = userSteps.every((val, index) => val === correctSteps[index]);

    if (allCorrect) {
        resultElement.innerText = "✅ Correct!";
        resultElement.style.color = "green";
    } else {
        resultElement.innerText = "Incorrect! Try again";
        resultElement.style.color = "red";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let answerField = document.getElementById("answer");
    if (answerField) {
        answerField.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                checkAnswer();
            }
        });
    }

    generateQuestion();
});
