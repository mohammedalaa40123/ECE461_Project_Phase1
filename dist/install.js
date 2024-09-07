import { Command } from 'commander';
import * as fs from 'fs';
import { exec } from 'child_process';
const program = new Command();
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
            const dependencies = data.split('\n').filter(dep => dep.trim() !== '');
            dependencies.forEach(dep => {
                exec(`npm install ${dep}`, (err, stdout, stderr) => {
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
        console.log('Dependencies installed successfully!');
        process.exit(0);
    }
    catch (_a) {
        console.error('Error installing dependencies');
        process.exit(1);
    }
});
program.parse(process.argv);
