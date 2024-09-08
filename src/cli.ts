#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import { exec } from 'child_process';

const program = new Command();

// Function to install a single dependency
const installDependency = (dep: string): Promise<void> => {
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

// Install command
program
  .command('install')
  .description('Install dependencies in userland')
  .action(() => {
    console.log('Installing dependencies...');
    fs.readFile('userland.txt', 'utf8', async (err, data) => {
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
          await installDependency(dep);
        }
        console.log('Dependencies installed successfully!');
        process.exit(0); // Exit with success
      } catch {
        console.error('Error installing dependencies');
        process.exit(1); // Exit with failure
      }
    });
  });

// URL_File command
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

      // Split the file contents by new lines to get an array of URLs
      const urls = data.split('\n').filter(url => url.trim() !== '');

      urls.forEach(url => {
        if (url.includes('github.com')) {
          console.log(`GitHub package: ${url}`);
        } else if (url.includes('npmjs.com')) {
          console.log(`npm package: ${url}`);
        } else {
          console.log(`Unknown package source: ${url}`);
        }
      });
    });
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