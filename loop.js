'use strict';

const allowedChars = ['a', 'b', 'c', 'd'];

function login(password) {
    return password === "abad";
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

function brute(maxLength = 6) {
    for (let passwordLength = 0; passwordLength <= maxLength ; passwordLength++) {
        let passwordArray = createPasswordArray(passwordLength);

        do {
            let password = arrayOfNumToString(passwordArray);

            if (login(password)) return `Password is: '${password}'`;

            passwordArray = getNextPasswordArray(passwordArray);
        } while (passwordArray);

    }
    return null;
}


console.time();
console.log(brute());
console.timeEnd();
