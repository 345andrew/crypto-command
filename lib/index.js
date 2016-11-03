#! /usr/bin/env node
"use strict";
const CryptoJS = require("crypto-js");
const fs = require("fs");
// user arguments.
let userArgs = process.argv.slice(2);
// validate arguments
let valid = true;
if (userArgs.length !== 3) {
    console.log("Incorrect parameters.");
    valid = false;
}
if (!(userArgs[0] === "-e" || userArgs[0] === "-d")) {
    console.log("Please specify -e for encrypt or -d for decrypt.");
    valid = false;
}
if (!userArgs[1]) {
    console.log("Please specify a file to encrypt / decrypt.");
    valid = false;
}
if (!userArgs[2]) {
    console.log("Please specify an encryption passphrase.");
    valid = false;
}
if (!valid) {
    console.log("Usage: \ncrypto-command -d|-e <string to decrypt|encrypt> <passphrase>");
    process.exit(1);
}
let fileData;
fs.readFile(userArgs[1], (err, data) => {
    if (err) {
        console.log("Error: " + err);
        process.exit(1);
    }
    else {
        fileData = data.toString();
        console.log(fileData);
        if (userArgs[0] === "-e") {
            console.log(CryptoJS.AES.encrypt(fileData, userArgs[2]).toString());
        }
        else {
            console.log(CryptoJS.AES.decrypt(fileData, userArgs[2]).toString(CryptoJS.enc.Utf8));
        }
    }
});
