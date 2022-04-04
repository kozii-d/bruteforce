'use strict';
class Queue {
    constructor(concurrentCount = 10) {
        this.tasks = [];
        this.count = concurrentCount;
        this.queueSize = 0;
        this.nextStep;
    }

    // TODO: добавить проверку, чтобы execute не включался, когда в tasks ничего нет
    // TODO: сделать рабочим метод onFulfilled

    add(task) {
        this.tasks.push(task);

        if (!this.isCanExecute()) return;

        this.execute();

    }

    execute() {
        const cb = this.tasks.shift();

        const promise = cb();
        if (promise === undefined) {
            return;
        }
        this.queueSize++;
        promise.then(res => {
            console.log(res);
            this.queueSize--;
            if (res.valid) {
                console.log(`Password is '${res.password}'`);
                this.tasks = [];
                this.queueSize = 0;
            }
            this.execute();
            this.nextStep();
        });
    }

    isCanExecute() {
        return this.queueSize < this.count;
    }

    onFulfilled(callback) {
        this.nextStep = callback;
    }

}


const allowedChars = ['a', 'b', 'c', 'd'];

function randomTime(min, max) {
    return (min + Math.random() * (max - min)).toFixed(2);
}


function login(password) {
    const valid = password === 'ab';

    return {
        password,
        valid
    };

    // return password === "ab";
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
            let password = arrayOfNumToString(passwordArray);
            yield payload(password);
            passwordArray = getNextPasswordArray(passwordArray);
        } while (passwordArray);

    }

}
console.time();


const iterator = brute(3);

const q = new Queue();
// q.add(() => iterator.next().value);

for (let i = 0; i < 20; i++) {
    q.add(() => iterator.next().value);
}

q.onFulfilled((result, password) => {
    q.add(() => iterator.next().value);
});

console.timeEnd();
