// Left elements
var billInput = document.getElementsByClassName('left-container__input--bill')[0];
var billWarning = document.getElementsByClassName('left-container__text--warning')[0];
var customTipButton = document.getElementsByClassName('custom-tip-button')[0];
var percentageButtons = document.getElementsByClassName('left-container__percent-btn');
var numberPeopleInput = document.getElementsByClassName('left-container__input--num-ppl')[0];
var numberPeopleWarning = document.getElementsByClassName('left-container__text--warning')[1];
var lastClicked = -1;

// Right elements
var personTip = document.getElementsByClassName('person-tip')[0];
var personTotal = document.getElementsByClassName('person-total')[0];
var resetButton = document.getElementsByClassName('right-container__reset-button')[0];
var rightFlexDiv = document.getElementsByClassName('right-container__flex-div')[0];

function returnToDefaultFontSize(elem)
{
    if (window.innerWidth > 1000)
    {
        elem.style.fontSize = '50px';
        return;
    }
    
    if (window.innerWidth > 750)
    {
        elem.style.fontSize = '40px';
        return;
    }

    if (window.innerWidth < 750)
        elem.style.fontSize = '30px';
}

function handleClick(index)
{
    for (let j = 0; j < 6; j++)
        percentageButtons[j].classList.remove('left-container__percent-btn--focus');

    if (index != lastClicked)
    {
        percentageButtons[index].classList.add('left-container__percent-btn--focus');
        lastClicked = index;
        return;
    }
        
    lastClicked = -1;
}

async function calculateTip() 
{
    function resizeToFit(elem)
    {        
        let elemWidth = elem.getBoundingClientRect().width;
        let flexDivWidth = rightFlexDiv.getBoundingClientRect().width;
        let fontSize = parseFloat(window.getComputedStyle(elem).fontSize);
    
        if (fontSize > 13)
            elem.style.fontSize = (fontSize - 1) + 'px';
        else
            return;

        if (elemWidth >= flexDivWidth / 2)
            resizeToFit(elem);
    }

    function containZeroes()
    {
        if (parseFloat(billInput.value) == 0 && parseFloat(numberPeopleInput.value) == 0)
        {
            billWarning.classList.remove('hidden');
            numberPeopleWarning.classList.remove('hidden');
            return true;
        }
        else
        {
            if (!billWarning.classList.contains('hidden') && !numberPeopleWarning.classList.contains('hidden'))
            {
                billWarning.classList.add('hidden');
                numberPeopleWarning.classList.add('hidden');
            }
        }

        if (parseFloat(billInput.value) == 0)
        {
            billWarning.classList.remove('hidden');
            return true;
        }
        else
        {
            if (!billWarning.classList.contains('hidden'))
                billWarning.classList.add('hidden');
        }

        if (parseFloat(numberPeopleInput.value) == 0)
        {
            numberPeopleWarning.classList.remove('hidden');
            return true;
        }
        else
        {
            if (!numberPeopleWarning.classList.contains('hidden'))
                numberPeopleWarning.classList.add('hidden');
        }

        return false;
    }

    if (billInput.value != "" && lastClicked > -1 && numberPeopleInput.value != "")
    {
        if (containZeroes())
            return;            

        let numberOfPeople = parseInt(numberPeopleInput.value);
        
        let tipPercentage = parseInt(percentageButtons[lastClicked].textContent);
        tipPercentage = (tipPercentage / 100) + 1;

        let billValue = parseFloat(billInput.value);
        let totalValue = billValue * tipPercentage;
        let tipValue = totalValue - billValue;

        let individualBill = `$${(totalValue / numberOfPeople).toFixed(2)}`;
        let individualTip = `$${(tipValue / numberOfPeople).toFixed(2)}`;

        if (personTotal.textContent != individualBill)
        {
            personTotal.textContent = individualBill;
            returnToDefaultFontSize(personTotal);
            resizeToFit(personTotal);
        }
        
        if (personTip.textContent != individualTip)
        {
            personTip.textContent = individualTip;
            returnToDefaultFontSize(personTip);
            resizeToFit(personTip);
        }
    }

    if (billInput.value != "" || lastClicked > -1 || numberPeopleInput.value != "")
        resetButton.classList.remove('right-container__reset-button--unavaliable');
    else
        if (!resetButton.classList.contains('right-container__reset-button--unavaliable'))
            resetButton.classList.remove('right-container__reset-button--unavaliable');
}

function TipButtonsEvents()
{
    for (let i = 0; i < 5; i++) // Leaves the Custom button out.
    {
        percentageButtons[i].addEventListener("click", () => 
        {
            percentageButtons[i].focus();
            handleClick(i);
            calculateTip();
        });
    }

    customTipButton.addEventListener("click", (event) => 
    {
        customTipButton.focus();
        customTipButton.style.fontSize = '20px';

        if (lastClicked == 5) // Already clicked.
        {
            handleClick(5);
            customTipButton.blur();
        }
        else
        {
            if (customTipButton.textContent === "Custom")
                customTipButton.textContent = "";
            else   
                // Removes the '%' from the text.
                customTipButton.textContent = customTipButton.textContent.slice(0, -1);
        }
    });

    // Disables .click() from being called when Enter is pressed.
    customTipButton.addEventListener("keypress", (event) => 
    {
        if (event.keyCode == 13)
            event.preventDefault();
    });

    customTipButton.addEventListener("keyup", (event) => 
    {
        if (event.key === "Enter") 
        {
            if (customTipButton.textContent && parseInt(customTipButton.textContent) != NaN)
            {
                customTipButton.textContent = `${customTipButton.textContent}%`;
                handleClick(5);
                calculateTip();
                return;
            }

            customTipButton.blur(); // Cancels the text editing.
        }
    });

    customTipButton.addEventListener("blur", () =>
    {
        if (!customTipButton.textContent || !customTipButton.textContent.includes("%"))
        {
            customTipButton.textContent = "Custom";
            customButtonTextResize();
        }
    });
}

function resetButtonEvent()
{
    resetButton.addEventListener("click", () => 
    {
        handleClick(lastClicked); // By sending the current value, it resets.
        billInput.value = "";
        numberPeopleInput.value = "";
        personTip.textContent = "$0.00";
        personTotal.textContent = "$0.00";
        returnToDefaultFontSize(personTip);
        returnToDefaultFontSize(personTotal);

        if (!billWarning.classList.contains('hidden'))
            billWarning.classList.add('hidden');

        if (!numberPeopleWarning.classList.contains('hidden'))
            numberPeopleWarning.classList.add('hidden');

        if (!resetButton.classList.contains('right-container__reset-button--unavaliable'))
            resetButton.classList.add('right-container__reset-button--unavaliable');
    });
}

function customButtonTextResize()
{
    if (customTipButton.textContent == 'Custom')
    {
        if (window.innerWidth > 350)
        {
            customTipButton.style.fontSize = '20px';
            return;
        }
    
        if (window.innerWidth > 325)
        {
            customTipButton.style.fontSize = '18px';
            return;
        }
    
        if (window.innerWidth > 300)
        {
            customTipButton.style.fontSize = '16px';
            return;
        }
    
        if (window.innerWidth > 262)
        {
            customTipButton.style.fontSize = '14px';
            return;
        }
    
        if (window.innerWidth > 225)
        {
            customTipButton.style.fontSize = '10px';
            return;
        }
    }
}


billInput.addEventListener('input', calculateTip);
numberPeopleInput.addEventListener('input', calculateTip);
window.addEventListener('resize', customButtonTextResize);
customButtonTextResize(); // Just in case the screen starts super small.
TipButtonsEvents();
resetButtonEvent();