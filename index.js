const fs = require('fs');
const readline = require('readline');
const readStream = fs.createReadStream('./access.log', 'utf8');
const writeStreamIP1 = fs.createWriteStream('./89.123.1.41.requests.log', 'utf8');
const writeStreamIP2 = fs.createWriteStream('./34.48.240.111.requests.log', 'utf8');

let firstIP = [];
let secondIP = [];

const rl = readline.createInterface({
    input: readStream,
    terminal: true,
});

rl.on('line', (line) => {
    if (line) {
        let ip = line.match(/\d+\.\d+\.\d+\.\d+/g).toString();

        switch (ip) {
            case '89.123.1.41':
                firstIP.push(line);
                writeStreamIP1.write(`${line}\n`);
                break;
            case '34.48.240.111':
                secondIP.push(line);
                writeStreamIP2.write(`${line}\n`);
                break;
            default:
                break;
        }
    }
});

rl.on('close', () => {
    console.log('Все');
});