#!/usr/bin/env node

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const program = new commander_1.Command();
// Install command
program
    .command('install')
    .description('Install dependencies in userland')
    .action(() => {
    try {
        console.log('Installing dependencies...');
        fs.readFile('userland.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading userland.txt:', err);
                return;
            }
            else {
                console.log('Dependencies:', data);
            }
            // Split the file contents by new lines to get an array of dependencies
            const dependencies = data.split('\n').filter(dep => dep.trim() !== '');
            // Install each dependency using npm
            dependencies.forEach(dep => {
                (0, child_process_1.exec)(`npm install ${dep}`, (err, stdout, stderr) => {
                    if (err) {
                        console.error(`Error installing ${dep}:`, err);
                        return;
                    }
                    console.log(`Successfully installed ${dep}`);
                    console.log(stdout);
                    console.error(stderr);
                });
            });
        });
        // console.log('Dependencies installed successfully!');
        // process.exit(0);// Exit with success
    }
    catch (_a) {
        console.error('Error installing dependencies');
        process.exit(1); // Exit with Failure
    }
});
// Input file processing
program
    .argument('<file>', 'Path to file containing URLs')
    .description('Process a file of URLs')
    .action((file) => {
    const filePath = path.resolve(file);
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        console.log('Processing URLs:', data.split('\n'));
    }
    else {
        console.error('File does not exist:', filePath);
        process.exit(1);
    }
});
program.parse(process.argv);
