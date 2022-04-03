'use strict';

const allowedChars = ['a', 'b', 'c', 'd'];

function login(password) {
    return password === "abc";
}

function arrayOfNumToString(passwordArray) {
    let password = '';
    for (let i = 0; i < passwordArray.length; i++) {
        password += allowedChars[passwordArray[i]];
    }
    return password;
    // return passwordArray.map(number => charsArray[number]).join('');
}

function createPasswordArray(arrayLength) {
    const exeptedPasswordArray = [];

    for (let i = 0; i < arrayLength; i++) {
        exeptedPasswordArray.push(0);
    }

    return exeptedPasswordArray;
}

function getNextPasswordArray(passwordArray) {
    for (let i = passwordArray.length - 1; i >= 0; i--) {
        if (passwordArray[i] < allowedChars.length - 1) {
            passwordArray[i]++;
            return passwordArray;
        }
        passwordArray[i] = 0;
    }
    return null;
}

function brute(maxLength = 5) {
let password = '';
let passwordLength = 1;
let passwordArray = createPasswordArray(passwordLength);


function test () {
    if (password.length > maxLength) return null;

    if (!passwordArray) {
        passwordLength++;
        passwordArray = createPasswordArray(passwordLength);
    }

    password = arrayOfNumToString(passwordArray);

    if (login(password)) return
    passwordArray = getNextPasswordArray(passwordArray);
    test();
}
test();

return `Password is: '${password}'`;

}


console.time();
console.log(brute());
console.timeEnd();
