let num1, num2;
function generateQuestion() {
    let addend1Input = document.getElementById("Addend1").value;
    let addend2Input = document.getElementById("Addend2").value;

    if (!addend1Input || !addend2Input || parseInt(addend1Input) < 0 || parseInt(addend2Input) < 0) {
        return;
    }

    num1 = parseInt(addend1Input);
    num2 = parseInt(addend2Input);

    let num1str = num1.toString().padStart(Math.max(num1.toString().length, num2.toString().length), '0');
    let num2str = num2.toString().padStart(num1str.length, '0');

    document.getElementById("num1").innerText = num1str;
    document.getElementById("num2").innerText = "+" + num2str;
    document.getElementById("result").innerText = "";

    let stepBox = document.getElementById("steps");
    stepBox.innerHTML = "";

    let carry = 0;
    let sumSteps = [];

    for (let i = num1str.length - 1; i >= 0; i--) {
        let digit1 = parseInt(num1str[i]);
        let digit2 = parseInt(num2str[i]);
        let columnSum = digit1 + digit2 + carry;
        carry = Math.floor(columnSum / 10);
        sumSteps.unshift(columnSum % 10);
    }
    if (carry > 0) {
        sumSteps.unshift(carry);
    }

    let sumRowDiv = document.createElement("div");
    sumRowDiv.classList.add("step-row");

    for (let i = 0; i < sumSteps.length; i++) {
        sumRowDiv.appendChild(createInputBox(sumSteps[i].toString()));
    }
    stepBox.appendChild(sumRowDiv);
}

function createInputBox(correctValue) {
    let inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.classList.add("step-input");
    inputBox.dataset.correct = correctValue;
    inputBox.maxLength = 1;
    inputBox.onfocus = function() { this.select(); };

    inputBox.addEventListener("input", function() {
        if (this.value.length === 1) {
            let prev = this.previousElementSibling;
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
    generateQuestion();
});
