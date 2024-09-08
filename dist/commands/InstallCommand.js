import * as fs from 'fs';
import { exec } from 'child_process';
export class InstallCommand {
    static installDependency(dep) {
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
    }
    static async run() {
        console.log('Installing dependencies...');
        fs.readFile('userland.txt', 'utf8', async (err, data) => {
            if (err) {
                console.error('Error reading userland.txt:', err);
                process.exit(1);
                return;
            }
            const dependencies = data.split('\n').filter(dep => dep.trim() !== '');
            try {
                for (const dep of dependencies) {
                    await InstallCommand.installDependency(dep);
                }
                console.log('Dependencies installed successfully!');
                process.exit(0);
            }
            catch {
                console.error('Error installing dependencies');
                process.exit(1);
            }
        });
    }
}
