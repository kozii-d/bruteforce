'use strict';
class Queue {
    constructor(concurrentCount = 5) {
        this.tasks = [];
        this.running = [];
        this.count = concurrentCount;
    }

    // TODO: добавить в конструктор булевое свойсьво и менять его каждый раз при проверки промиса

    add(task) {
        this.tasks.push(task);

        if (!this.isCanExecute()) return;

        this.execute();

    }

    execute() {
        const cb = this.tasks.shift();
        const promise = cb();
        promise.then(res => {
            console.log(res);
            this.running.shift();
            this.onFulfilled(res);
            this.execute();
        });
        this.running.push(promise);
    }

    isCanExecute() {
        return this.running.length < this.count;
    }

    onFulfilled(res) {
        if (!(this.running.length < this.count)) return;
        if (res) return;

        this.add(() => iterator.next().value);
    }

}

const iterator = brute(2);

const q = new Queue();
q.add(() => iterator.next().value);


const allowedChars = ['a', 'b', 'c', 'd'];

function randomTime(min, max) {
    return (min + Math.random() * (max - min)).toFixed(2);
}


function login(password) {

    return password === "a";
}

async function payload(password){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(login(password));
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
    for (let passwordLength = 0; passwordLength <= maxLength ; passwordLength++) {
        let passwordArray = createPasswordArray(passwordLength);

        do {
            // yield arrayOfNumToString(passwordArray);
            let password = arrayOfNumToString(passwordArray);

            yield payload(password);

            passwordArray = getNextPasswordArray(passwordArray);
        } while (passwordArray);

    }

}
console.time();


console.timeEnd();
