var resultDiv = document.getElementsByClassName("top-part__result-div")[0];
var resultText = document.getElementsByClassName("top-part__result-text")[0];
var resultOperation = document.getElementsByClassName("top-part__result-operation")[0];
var regularButtons = document.getElementsByClassName("bot-part__regular-btn");
var deleteButton = document.getElementsByClassName("bot-part__del-btn")[0];
var resetButton = document.getElementsByClassName("bot-part__reset-btn")[0];
var resultButton = document.getElementsByClassName("bot-part__result-btn")[0];
var calculations = []

function resizeToFit()
{
    // Saves on computational power if there's no text when resizing window.
    if (resultText.textContent == "")
        return;

    let elemWidth = resultText.getBoundingClientRect().width;
    let containerWidth = resultDiv.getBoundingClientRect().width;
    let fontSize = parseFloat(window.getComputedStyle(resultText).fontSize);

    if (elemWidth >= (containerWidth * 0.925))
    {
        if (fontSize > 13)
            resultText.style.fontSize = (fontSize - 1) + 'px';
        else
            return;
    
        resizeToFit(resultText);
    }
}

function updateDisplay()
{
    resultText.textContent = "";
    for (let i = 0, len = calculations.length; i < len; i++)
        resultText.textContent += calculations[i];

    resizeToFit();
}

function recieveInput(key)
{
    let len = calculations.length;
    
    if ((isNaN(key) && key != ".") || len == 0)
        calculations.push(key);
    else
        if (!isNaN(calculations[len - 1]) || calculations[len - 1] == ".") 
            calculations[len - 1] += key;
        else
            calculations.push(key);

    updateDisplay();
}

function deleteLastElement()
{
    let len = calculations.length;

    if (len == 0)
        return;

    if (isNaN(calculations[len - 1]) || calculations[len - 1] == ".")
        calculations.pop();
    else
        calculations[len - 1] = calculations[len - 1].slice(0, -1);

    updateDisplay();
}

function resetCalculator()
{
    resultOperation.style.display = "none";
    resultText.style.fontSize = '40px';
    calculations = [];
    updateDisplay();
}

function showLastOperation()
{
    resultOperation.style.display = "block";
    resultOperation.textContent = resultText.textContent;
}

function showErrorMessage()
{
    resultOperation.style.display = "block";
    resultOperation.textContent = "Invalid operation!";
}

function calculate()
{
    if (isNaN(calculations[calculations.length - 1]))
        return showErrorMessage();

    // Defined outside of 'operation()' so it doesnt recreate the variable every time it's called.
    let result = {
        "x": (i) => { return parseFloat(calculations[i - 1]) * parseFloat(calculations[i + 1]) },
        "/": (i) => { return parseFloat(calculations[i - 1]) / parseFloat(calculations[i + 1]) },
        "+": (i) => { return parseFloat(calculations[i - 1]) + parseFloat(calculations[i + 1]) },
        "-": (i) => { return parseFloat(calculations[i - 1]) - parseFloat(calculations[i + 1]) }
    }

    function operation(operator)
    {
        for (let i = 0, len = calculations.length; i < len; i++)
        {
            if (calculations[i] == operator)
            {
                if (i != len - 1)
                {
                    calculations[i] = result[operator](i);
                    calculations.splice(i - 1, 1); // Deletes the first term of the operation.
                    calculations.splice(i, 1); // Since the above was deleted, the second term's index is now 'i'. 
                    return true; // While-loop will continue; this for-loop will restart.
                }
            }
        } 
        
        return false;
    }

    while (operation("x"));
    while (operation("/"));
    while (operation("+"));
    while (operation("-"));

    showLastOperation();
    updateDisplay();

    // Needs to be a string, so it doesnt break the 'DEL' button (that works with strings).
    calculations[0] = calculations[0].toString();
}

for (let i = 0, len = regularButtons.length; i < len; i++)
    regularButtons[i].addEventListener("click", () => 
    {
        recieveInput(regularButtons[i].textContent)
    });

deleteButton.addEventListener("click", () => 
{
    deleteLastElement()
});

resetButton.addEventListener("click", () => 
{
    resetCalculator()
});

resultButton.addEventListener("click", () => 
{
    calculate()
});

window.addEventListener("resize", () => 
{
    resultText.style.fontSize = '40px';
    resizeToFit()
});