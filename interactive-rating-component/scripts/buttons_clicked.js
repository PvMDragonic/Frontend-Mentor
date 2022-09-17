var firstWindow = document.getElementsByClassName('first-window')[0];
var secondWindow = document.getElementsByClassName('second-window')[0];
var scoreButtons = document.getElementsByClassName('first-window__numbers');
var submitButton = document.getElementsByClassName('first-window__submit-button')[0];
var returnButton = document.getElementsByClassName('second-window__return-button')[0];
var scoreMessage = document.getElementsByClassName('second-window__score-message')[0];
var scoreGiven = -1;

function scoreCircleClicked(value)
{
    if (scoreGiven != value)
    {
        if (scoreGiven == -1)
        {
            scoreButtons[value].classList.add("first-window__numbers--focus");
        }
        else
        {
            scoreButtons[scoreGiven].classList.remove("first-window__numbers--focus");
            scoreButtons[value].classList.add("first-window__numbers--focus");
        }

        scoreGiven = value;
    }
    else
    {
        scoreButtons[value].classList.remove("first-window__numbers--focus");
        scoreGiven = -1;
    }         
}

function submitButtonClicked()
{
    if (scoreGiven != -1)
    {
        firstWindow.classList.add('hide-content');
        secondWindow.classList.remove('hide-content');
        scoreMessage.textContent = `You selected ${scoreGiven + 1} out of 5`;
    }
    else
    {
        submitButton.classList.add("apply-shake");
        submitButton.addEventListener("animationend", () => 
        {
            submitButton.classList.remove("apply-shake");
        });
    }  
}

function returnButtonClicked()
{
    scoreGiven = -1;
    secondWindow.classList.add('hide-content');
    firstWindow.classList.remove('hide-content');

    for (let i = 0; i < 5; i++) 
        scoreButtons[i].classList.remove("first-window__numbers--focus");
}

for (let i = 0; i < 5; i++)
{
    scoreButtons[i].addEventListener('click', () =>
    {
        scoreCircleClicked(i);
    });
}

returnButton.addEventListener('click', returnButtonClicked);