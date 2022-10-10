var body = document.getElementById("body");

// Top elements
var topTexts = document.getElementsByClassName("top-part__text");
var toggleBtns = document.getElementsByClassName("top-part__modeBtn");
var toggleBackground = document.getElementsByClassName("top-part__switch-toggle")[0];
var resultDiv = document.getElementsByClassName("top-part__result-div")[0];

// Bottom elements
var bottomPart = document.getElementsByClassName("bot-part")[0];
var regularButtons = document.getElementsByClassName("bot-part__regular-btn");
var deleteButton = document.getElementsByClassName("bot-part__del-btn")[0];
var resetButton = document.getElementsByClassName("bot-part__reset-btn")[0];
var resultButton = document.getElementsByClassName("bot-part__result-btn")[0];

// Footer
var footer = document.getElementsByClassName("footer")[0];
var footerTitle = document.getElementsByClassName("footer__title")[0];
var footerDetails = document.getElementsByClassName("footer__details")[0];

function toggleMode(index)
{
    function removeClasses(mode)
    {
        for (let i = 0, len = topTexts.length; i < len; i++)
            topTexts[i].classList.remove(`top-part__text--${mode}`);

        for (let i = 0, len = regularButtons.length; i < len; i++)
            regularButtons[i].classList.remove(`bot-part__regular-btn--${mode}`);

        body.classList.remove(`body--${mode}`);
        toggleBackground.classList.remove(`top-part__switch-toggle--${mode}`);
        resultDiv.classList.remove(`top-part__result-div--${mode}`);
        bottomPart.classList.remove(`bot-part--${mode}`);
        deleteButton.classList.remove(`bot-part__del-btn--${mode}`);
        resetButton.classList.remove(`bot-part__reset-btn--${mode}`);
        resultButton.classList.remove(`bot-part__result-btn--${mode}`);
        footer.classList.remove(`footer--${mode}`);
        footerTitle.classList.remove(`footer__title--${mode}`);
        footerDetails.classList.remove(`footer__details--${mode}`);
    }

    function addClasses(mode)
    {
        for (let i = 0, len = topTexts.length; i < len; i++)
            topTexts[i].classList.add(`top-part__text--${mode}`);

        for (let i = 0, len = regularButtons.length; i < len; i++)
            regularButtons[i].classList.add(`bot-part__regular-btn--${mode}`);

        body.classList.add(`body--${mode}`);
        toggleBackground.classList.add(`top-part__switch-toggle--${mode}`);
        resultDiv.classList.add(`top-part__result-div--${mode}`);
        bottomPart.classList.add(`bot-part--${mode}`);
        deleteButton.classList.add(`bot-part__del-btn--${mode}`);
        resetButton.classList.add(`bot-part__reset-btn--${mode}`);
        resultButton.classList.add(`bot-part__result-btn--${mode}`);
        footer.classList.add(`footer--${mode}`);
        footerTitle.classList.add(`footer__title--${mode}`);
        footerDetails.classList.add(`footer__details--${mode}`);
    }


    let dict = {
        0: "lm",
        1: "dm",
        2: "hcm"
    };

    if (body.classList.contains(`body--${dict[index]}`))
        return;

    if (index == 0)
    {
        removeClasses("dm");
        removeClasses("hcm");
        addClasses("lm");
    }
    else if (index == 1)
    {
        removeClasses("lm");
        removeClasses("hcm");
        addClasses("dm");
    }
    else if (index == 2)
    {
        removeClasses("lm");
        removeClasses("dm");
        addClasses("hcm");
    }
}

for (let i = 0; i < 3; i++)
{
    toggleBtns[i].addEventListener("click", () => 
    {
        toggleMode(i)
    })
};