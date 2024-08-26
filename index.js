const dicLetterTo = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
};

const dicTextTo = {};

for (const key in dicLetterTo) {
    dicTextTo[dicLetterTo[key]] = key;
}

const encryptZone = document.getElementById('encryptZone');
const textarea = document.createElement('textarea');

textarea.className = 'showTextEncrypted';
textarea.id = 'textForCopy';

function createBtn () {
    const btn = document.createElement('button');
    const spanbtn = document.createElement('span');
    btn.id = 'btnCopy';
    btn.setAttribute('data-clipboard-target', '#textForCopy');
    spanbtn.className = 'btnCopy-Text';
    spanbtn.textContent = 'Copiar';
    encryptZone.appendChild(btn);
    btn.appendChild(spanbtn);
}

const input = document.getElementById('textToEncrypt');
let inputIsValid = true;

input.addEventListener('input', function () {
    const onlyLowercaseLetters = /^[a-z\s]+$/;
    const button1 = document.getElementById('btnEncrypt');
    const button2 = document.getElementById('btnDecrypt');

    const instruction = document.getElementsByClassName('textOnlyLowerCase');

    if (!this.value.match(onlyLowercaseLetters)) {
        instruction[0].classList.add('vibrate-and-highlight');
        button1.disabled = true;
        button2.disabled = true;
        inputIsValid = false;
    } else {
        instruction[0].classList.remove('vibrate-and-highlight');
        button1.disabled = false;
        button2.disabled = false;
        inputIsValid = true;
    }
});

function encrypt () {
    if (inputIsValid) {
        const userText = document.getElementById('textToEncrypt').value;
        let textEncrypted = '';
        for (const char of userText) {
            textEncrypted += dicLetterTo[char] || char;
        }

        textarea.textContent = textEncrypted;
        encryptZone.textContent = '';
        encryptZone.appendChild(textarea);
        createBtn();
    }
}

function decrypt () {
    if (inputIsValid) {
        const userText = document.getElementById('textToEncrypt').value;
        const textarea = document.createElement('textarea');
        let newText = userText;
        for (const char in dicTextTo) {
            newText = newText.replaceAll(char, dicTextTo[char]);
            textarea.textContent = newText;
            textarea.className = 'showTextEncrypted';
            textarea.id = 'textForCopy';
            encryptZone.textContent = '';
            encryptZone.appendChild(textarea);
        }
        createBtn();
    }
}

function errorEffect () {
    const elements = document.getElementsByClassName('textOnlyLowerCase');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add('vibrate');
    }
}