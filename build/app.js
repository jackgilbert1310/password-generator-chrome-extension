// Variable declaration
var passwordDisplayEl = document.getElementById('password');
var passLengthInputEl = document.getElementById('passLength');
var generatePassBtnEl = document.getElementById('generatePassBtn');
var copyPassBtnEl = document.getElementById('copyPassBtn');
var strengthBarEl = document.getElementById('strengthBar');

var updateLengthDownEl = document.getElementById('updateLengthDown');
var updateLengthUpEl = document.getElementById('updateLengthUp');
var updateLengthButtons = [];
updateLengthButtons.push(updateLengthDownEl,updateLengthUpEl);

var uppercaseCheckBoxEl = document.getElementById('includeUppercase');
var lowercaseCheckBoxEl = document.getElementById('includeLowercase');
var numberCheckBoxEl = document.getElementById('includeNumbers');
var symbolCheckBoxEl = document.getElementById('includeSymbols');

var uppercaseCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercaseCharSet = "abcdefghijklmnopqrstuvwxyz";
var numberCharSet = "0123456789";
var symbolCharSet = `$@#&!`;

var charSet = "";

// Function declaration
function checkPassValue() {
    if (passwordDisplayEl.value == "") {
        passwordDisplayEl.disabled = true;
    } else {
        passwordDisplayEl.disabled = false;
    }
}

function generatePassword() {
    var charSet = generateCharSet();
    var password = '';
    if (passLengthInputEl.value <= 8) {
        passLengthInputEl.value = 8;
    }
    for (var i = 0; i < passLengthInputEl.value; i++) {
        var randomPosition = Math.floor(Math.random() * charSet.length);
        password += charSet.substring(randomPosition, randomPosition + 1);
    }
    passwordDisplayEl.value = password;
    checkStrength(password);
    return password;
}

function generateCharSet() {
    var charset = "";
    if (uppercaseCheckBoxEl.checked == true) {
        charset = uppercaseCharSet;
    }
    if (lowercaseCheckBoxEl.checked == true) {
        charset += lowercaseCharSet;
    }
    if (numberCheckBoxEl.checked == true) {
        charset += numberCharSet;
    }
    if (symbolCheckBoxEl.checked == true) {
        charset += symbolCharSet;
    }
    if (uppercaseCheckBoxEl.checked == false && lowercaseCheckBoxEl.checked == false && numberCheckBoxEl.checked == false && symbolCheckBoxEl.checked == false) {
        charset = uppercaseCharSet + lowercaseCharSet + numberCharSet + symbolCharSet;
    }
    return charset;
}

function checkStrength(password) {
    var strength = 0;
    if (password.match(/[a-z]+/)) {
        strength += 20;
    }
    if (password.match(/[A-Z]+/)) {
        strength += 20;
    }
    if (password.match(/[0-9]+/)) {
        strength += 20;
    }
    if (password.match(/[$@#&!]+/)) {
        strength += 20;
    }
    if (password.length >= 12) {
        strength += 20;
    }
    strengthBarEl.value = strength;
}

function updateLength(direction) {
    if (direction == "up") {
        passLengthInputEl.value++;
        if (passLengthInputEl.value >= 32) {
            passLengthInputEl.value = 32;
        }
    }
    if (direction == "down") {
        passLengthInputEl.value--;
        if (passLengthInputEl.value <= 8) {
            passLengthInputEl.value = 8;
        }
    }
}

function copyToClipboard() {
    passwordDisplayEl.select();
    document.execCommand("copy");
    alert('Copied password to clipboard');
}

// Call functions and event listeners
passwordDisplayEl.disabled = true;

document.addEventListener("click", checkPassValue);
generatePassBtnEl.addEventListener("click", generatePassword);
copyPassBtnEl.addEventListener("click", copyToClipboard);

updateLengthButtons.forEach((button) => {
    if (button.id == "updateLengthUp") {
        button.addEventListener("click", () => {updateLength('up')}, false);
    }
    if (button.id == "updateLengthDown") {
        button.addEventListener("click", () => {updateLength('down')}, false);
    }
});