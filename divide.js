function generateQuestion() {
    let dividend = parseInt(document.getElementById("dividend").value);
    let divisor = parseInt(document.getElementById("divisor").value);

    if (!dividend || !divisor || divisor == 0) {
        alert("Please enter a valid number.");
        return;
    }

    let quotient = Math.floor(dividend / divisor).toString();
    let remainder = dividend % divisor;
    let stepsHTML = `<div>${divisor}) ${dividend} (<input class="quotient-box" id="quotient">)</div>`;

    let currentNumber = "";
    let pos = 0;
    let workingDividend = dividend.toString();

    while (pos < workingDividend.length) {
        currentNumber += workingDividend[pos];
        let currentVal = parseInt(currentNumber);

        if (currentVal >= divisor) {
            stepsHTML += `<div> - <input class='step-box' id='step-${pos}'></div>`;
            stepsHTML += `<div class='line'></div>`;
            stepsHTML += `<div>&nbsp;&nbsp;<input class='step-box' id='remainder-${pos}'></div>`;
            currentNumber = "";
        }
        pos++;
    }

    stepsHTML += `<div>Remainder: <input class='remainder-box' id='remainder'></div>`;
    document.getElementById("question").innerHTML = stepsHTML;
}

function checkAnswer() {
    let dividend = parseInt(document.getElementById("dividend").value);
    let divisor = parseInt(document.getElementById("divisor").value);
    let correctQuotient = Math.floor(dividend / divisor);
    let correctRemainder = dividend % divisor;

    let userQuotient = parseInt(document.getElementById("quotient").value);
    let userRemainder = parseInt(document.getElementById("remainder").value);

    if (userQuotient !== correctQuotient || userRemainder !== correctRemainder) {
        document.getElementById("result").innerText = `Incorrect. Correct Quotient = ${correctQuotient}, Remainder = ${correctRemainder}`;
        document.getElementById("result").style.color = "red";
    } else {
        document.getElementById("result").innerText = `Correct! Quotient = ${correctQuotient}, Remainder = ${correctRemainder}`;
        document.getElementById("result").style.color = "green";
    }
}
