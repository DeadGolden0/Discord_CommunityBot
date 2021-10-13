const chalk = require("chalk");
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const utc = require('dayjs/plugin/utc');
require('dayjs/locale/fr');
dayjs.extend(utc)
dayjs.extend(localizedFormat)

exports.log = (content, type = "log") => {
    const timestamp = `[${dayjs().locale('fr').format("LLLL")}]`;
    switch (type) {
        case "log": {
        return console.log(`${timestamp} ${chalk.blue(type.toUpperCase())} ${content} `);
        }
        case 'warn': {
        return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} ${content} `);
        }
        case 'error': {
        return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} ${content} `);
        }
        case 'cmd': {
        return console.log(`${timestamp} ${chalk.gray(type.toUpperCase())} ${content}`);
        }
        case 'ready': {
        return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
        }
        case 'load': {
        return console.log(`${timestamp} ${chalk.magenta(type.toUpperCase())} ${content} `);
        }
        case 'event': {
        return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} ${content} `);
        }
        default: throw new TypeError('Wrong type of logger kid');
    }
};

exports.error = (...args) => this.log(...args, 'error');

exports.warn = (...args) => this.log(...args, 'warn');

exports.cmd = (...args) => this.log(...args, 'cmd');

exports.ready = (...args) => this.log(...args, 'ready');

exports.load = (...args) => this.log(...args, 'load');

exports.event = (...args) => this.log(...args, 'event');