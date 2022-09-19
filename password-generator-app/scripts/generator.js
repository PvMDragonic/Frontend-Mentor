var passwordText = document.getElementsByClassName('top-part__password-text')[0];
var copyIcon = document.getElementsByClassName('top-part__copy-icon')[0];

var sizeSlider = document.getElementsByClassName('bottom-part__char-length')[0];
var passwordSize = document.getElementsByClassName('bottom-part__form-label--slider-value')[0];

var upperCheckbox = document.getElementById('uppercase-checkbox');
var lowerCheckbox = document.getElementById('lowercase-checkbox');
var numbersCheckbox = document.getElementById('numbers-checkbox');
var symbolsCheckbox = document.getElementById('symbols-checkbox');

var generateBtn = document.getElementsByClassName('bottom-part__generate-btn')[0];
var passwordStrText = document.getElementsByClassName('bottom-part__strenght-text')[1];
var passwordLvlBars = document.getElementsByClassName('bottom-part__strenght-level');

function copyTextToClipboard(text) 
{
    if (passwordText.textContent == 'PASSWORD')
        return;

    if (!navigator.clipboard)
        return;
        
    navigator.clipboard.writeText(text);
}

function generatePassword()
{
    function setPasswordStrenght(strenght)
    {
        let passwordDescriptions = {
            0 : "CRINGE",
            1 : "WEAK",
            2 : "MEDIUM",
            3 : "STRONG",
            4 : "POGGERS"
        }

        passwordStrText.textContent = passwordDescriptions[strenght.score];
        
        for (let i = 0; i < 4; i++)
        {
            if (i <= (strenght.score - 1)) // Has to be one lower, because the array starts at 0.
            {
                passwordLvlBars[i].style.background = 'rgb(246, 203, 104)';
                continue;
            }

            passwordLvlBars[i].style.background = "none";
        }
    }

    let charPool = '';
    let password = '';

    if (upperCheckbox.checked)
        charPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (lowerCheckbox.checked)
        charPool += 'abcdefghijklmnopqrstuvwxyz';

    if (numbersCheckbox.checked)
        charPool += '0123456789';

    if (symbolsCheckbox.checked)
        charPool += '~`!@#$%^&*()_-+={[}]|\\:;"\'<,>.?/';

    if (charPool)
    {
        for (let i = 0; i < sizeSlider.value; i++)
            password += charPool.charAt(Math.floor(Math.random() * charPool.length));

        passwordText.textContent = password;
        setPasswordStrenght(zxcvbn(password))
    }

}

sizeSlider.addEventListener('change', () => 
{
    passwordSize.textContent = sizeSlider.value;
});

copyIcon.addEventListener('click', () => 
{
    copyTextToClipboard(passwordText.textContent);
});

generateBtn.addEventListener('click', generatePassword);