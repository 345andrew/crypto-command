#! /usr/bin/env node

import * as CryptoJS from "crypto-js";
import * as fs from "fs";

// user arguments.
let userArgs: string[] = process.argv.slice(2);

// validate arguments
let valid: boolean = true;
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
  console.log("Usage: \ncrypto-command -d|-e <path of file to decrypt|encrypt> <passphrase>");
  process.exit(1);
}

let fileData: string;

fs.readFile(userArgs[1], (err: Error, data: Buffer): void => {
  if (err) {
    console.log("Error: " + err);
    process.exit(1);
  } else {
    fileData = data.toString();
    console.log(fileData);

    if (userArgs[0] === "-e") {
      console.log(CryptoJS.AES.encrypt(fileData, userArgs[2]).toString());
    } else {
      console.log(CryptoJS.AES.decrypt(fileData, userArgs[2]).toString(CryptoJS.enc.Utf8));
    }
  }
});
