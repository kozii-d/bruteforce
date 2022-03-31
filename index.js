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
            promise.then((res) => {
                if (res) console.log(res);
                this.complete.push(this.running.shift());
                this.run();
            });
            this.running.push(promise);
        }
    }
}


const allowedChars = ['a', 'b', 'c', 'd'];

function randomTime(min, max) {
    return (min + Math.random() * (max - min)).toFixed(2);
}


async function login(password) {

    // return password === "abc";

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(password === "abadcd");
            console.log(password)
        }, randomTime(100,1000));
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
            // yield arrayOfNumToString(passwordArray);
            let password = arrayOfNumToString(passwordArray);

            yield login(password)
            // if (login(password)) return `Password is: '${password}'`;
            // passwords.push(password);

            passwordArray = getNextPasswordArray(passwordArray);
        } while (passwordArray);

    }
    // return passwords;
    // return null;
}

const iterator = brute();

function createTasks(generator) {

    let promArr = [];

    for (let password of generator) {
        promArr.push(password);
    }

    return promArr;
}

// console.log(createTasks(iterator));

console.time();


const queue = new Queue(createTasks(iterator));
queue.run();
// console.log(queue.running);

console.timeEnd();
