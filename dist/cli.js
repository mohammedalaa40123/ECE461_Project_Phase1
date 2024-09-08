#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from 'commander';
import * as fs from 'fs';
import { exec } from 'child_process';
const program = new Command();
const installDependency = (dep) => {
    return new Promise((resolve, reject) => {
        exec(`npm install ${dep}`, (err, stdout, stderr) => {
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
        const dependencies = data.split('\n').filter(dep => dep.trim() !== '');
        try {
            for (const dep of dependencies) {
                yield installDependency(dep);
            }
            console.log('Dependencies installed successfully!');
            process.exit(0);
        }
        catch (_a) {
            console.error('Error installing dependencies');
            process.exit(1);
        }
    }));
});
program
    .command('URL_File <file>')
    .description('Process a URL file')
    .action((file) => {
    console.log(`Processing URL file: ${file}`);
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${file}:`, err);
            process.exit(1);
            return;
        }
        const urls = data.split('\n').filter(url => url.trim() !== '');
        urls.forEach(url => {
            if (url.includes('github.com')) {
                console.log(`GitHub package: ${url}`);
            }
            else if (url.includes('npmjs.com')) {
                console.log(`npm package: ${url}`);
            }
            else {
                console.log(`Unknown package source: ${url}`);
            }
        });
    });
});
program
    .command('test')
    .description('Run tests')
    .action(() => {
    console.log('Running tests...');
});
program.parse(process.argv);
