'use strict';
class Queue {
    constructor(tasks = [], concurrentCount = 10) {
        this.total = tasks.length;
        this.todo = tasks;
        this.running = [];
        this.complete = [];
        this.count = concurrentCount;
    }


    add() {
        return ((this.running.length < this.count) && this.todo.length);
    }

    run() {
        while (this.add()) {
            const promise = this.todo.shift();
            promise.then(() => {
                this.complete.push(this.running.shift());
                this.run();
            });
            this.running.push(promise);
        }
    }
}





const allowedChars = ['a', 'b', 'c', 'd'];


async function login(password) {
    function randomTime(min, max) {
        return (min + Math.random() * (max - min)).toFixed(2);
    }

    // return password === "abc";

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(password === "abc");
        }, randomTime(0.1,1));
    });
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

function* brute(maxLength = 6) {
    // const passwords = [];
    for (let passwordLength = 0; passwordLength <= maxLength ; passwordLength++) {
        let passwordArray = createPasswordArray(passwordLength);

        do {
            yield arrayOfNumToString(passwordArray);
            // let password = arrayOfNumToString(passwordArray);
            // if (login(password)) return `Password is: '${password}'`;
            // passwords.push(password);

            passwordArray = getNextPasswordArray(passwordArray);
        } while (passwordArray);

    }
    // return passwords;
    // return null;
}


console.time();
// console.log(brute(3));
const iterator = brute(3);
console.log(iterator);

const taskQueue = new Queue(iterator);
taskQueue.run();
console.log(taskQueue.complete);

// for (let password of iterator) {
//     taskQueue.run();
// }

console.timeEnd();

