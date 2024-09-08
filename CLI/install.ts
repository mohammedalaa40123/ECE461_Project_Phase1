import { Command } from 'commander';
import * as fs from 'fs';
import { exec } from 'child_process';

const program = new Command();

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
        // console.log('Dependencies:', dependencies);
        // Install each dependency using npm
        dependencies.forEach(dep => {
          exec(`npm install ${dep}`, (err, stdout, stderr) => {
            if (err) {
              console.error(`Error installing ${dep}:`, err);
              return;
            }
            else { console.log('Installing:'); }
            console.log(`Successfully installed ${dep}`);
            console.log('-----------------------------');
            console.log(stdout);
            console.error(stderr);
          });
        });
      });
      console.log('Dependencies installed successfully!');
      process.exit(0);// Exit with success

    } catch {
      console.error('Error installing dependencies');
      process.exit(1); // Exit with Failure
    }

  });

// Input file processing

program.parse(process.argv);
