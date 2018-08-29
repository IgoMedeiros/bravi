'use strict';

const readline = require("readline");

const q1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

q1.question("Enter a valid brackets sequence: ", answer => {
    valid_brackets(answer);
    q1.close();
});

const valid_brackets = brackets_input => {
    if (valid_input(brackets_input)) {
        const res = calculated_brackets(brackets_input);
        if (res) {
            console.log("Correct sequence!");
        } else {
            console.log("Incorrect sequence!");
        }
    } else {
        console.log("Incorrect sequence!");
    }
};

const valid_input = brackets_input => {
    const pattern = /([0-9,a-z,A-Z]|\+|\-|\_|\=|\&|\*|\^|\/|\:|\;|\,|\.|\||\!|\@|\#|\$|\%|\"|\>|\<|\~|\'|\`|\\)/g;
    const res = pattern.test(brackets_input);
    return !res;
};

const calculated_brackets = brackets_input => {
    let total_parentheses = 0;
    let total_brackets = 0;
    let total_keys = 0;
    const array_brackets = brackets_input.split("");
    array_brackets.forEach(bracket => {
        total_parentheses = bracket == '(' ? ++total_parentheses : total_parentheses;
        total_parentheses = bracket == ')' ? --total_parentheses : total_parentheses;
        total_brackets = bracket == '[' ? ++total_brackets : total_brackets;
        total_brackets = bracket == ']' ? --total_brackets : total_brackets;
        total_keys = bracket == '[' ? ++total_keys : total_keys;
        total_keys = bracket == ']' ? --total_keys : total_keys;
    });
    const res = total_parentheses == 0 && total_brackets == 0 && total_keys == 0 ? true : false;
    return res;
};