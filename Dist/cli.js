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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const program = new commander_1.Command();
// Function to install a single dependency
const installDependency = (dep) => {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`npm install ${dep}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error installing ${dep}:`, err);
                reject(err);
                return;
            }
            console.log(`Successfully installed ${dep}`);
            console.log('-----------------------------');
            console.log(stdout);
            console.error(stderr);
            resolve();
        });
    });
};
// Install command
program
    .command('install')
    .description('Install dependencies in userland')
    .action(() => {
    console.log('Installing dependencies...');
    fs.readFile('userland.txt', 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('Error reading userland.txt:', err);
            process.exit(1);
            return;
        }
        // Split the file contents by new lines to get an array of dependencies
        const dependencies = data.split('\n').filter(dep => dep.trim() !== '');
        try {
            // Install each dependency using npm
            for (const dep of dependencies) {
                yield installDependency(dep);
            }
            console.log('Dependencies installed successfully!');
            process.exit(0); // Exit with success
        }
        catch (_a) {
            console.error('Error installing dependencies');
            process.exit(1); // Exit with failure
        }
    }));
});
// URL_File command
program
    .command('URL_File <file>')
    .description('Process a URL file')
    .action((file) => {
    console.log(`Processing URL file: ${file}`);
    // Add your URL file processing logic here
});
// Test command
program
    .command('test')
    .description('Run tests')
    .action(() => {
    console.log('Running tests...');
    // Add your test command logic here
});
program.parse(process.argv);
