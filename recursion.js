'use strict';

const allowedChars = ['a', 'b', 'c', 'd'];

function login(password) {
    return password === "abc";
}

function arrayIteration(k, allowedChars, login, password = '') {
    if (k === 0) {
        return login(password) ? password : null;
    }

    for (let i = 0; i < allowedChars.length; i++) {
        let newPassword = password + allowedChars[i];
        let result = arrayIteration(k - 1, allowedChars, login, newPassword);
        if (result) {
            return result;
        }
    }
    return null;
}

function brute(maxLength = 5) {

    for (let i = 1; i <= maxLength; i++) {
        let result = arrayIteration(i, allowedChars, login);
        if (result) {
            return `Password is: '${result}'`;
        }
    }

    return null;
}
console.time();
console.log(brute());
console.timeEnd();
