'use strict';
const path = require('path');
const chalk = require('chalk');
const figures = require('figures');
const types = require('./types');

const now = () => Date.now();
const timeSpan = then => {
  return now() - then;
};

class Signale {
  constructor(options = {}) {
    this.types = { ...types, ...options.types };
    this.timers = options.timers || new Map();
    this.stream = options.stream || process.stdout;

    Object.keys(this.types).forEach(type => {
      this[type] = this.logger.bind(this, type);
    });
  }

  getDate() {
    const d = new Date();
    return `${d.getDate()}/${d.getMonth() + 1}/${String(d.getFullYear()).substring(
      2,
    )} ${d.getHours()}:${d.getMinutes()}`;
  }

  getFilename() {
    const _ = Error.prepareStackTrace;
    Error.prepareStackTrace = (error, stack) => stack;
    const { stack } = new Error();
    Error.prepareStackTrace = _;

    const callers = stack.map(x => {
      const fileName = x.getFileName();
      const pathname = fileName ? path.dirname(fileName).split(/(\/|\\)/) : [];
      const length = pathname.length;
      return length > 2 ? `${pathname[length - 3]}/${pathname[length - 1]}` : pathname[0];
    });

    return callers.find(x => {
      return x !== callers[0];
    });
  }

  logger(type, ...messageObj) {
    this.createLog(this.buildSignale(this.types[type], ...messageObj));
  }

  createLog(message) {
    this.stream.write(message + '\n');
  }

  generateMeta() {
    const arr = [];
    if (process.env.NODE_ENV === 'production') {
      arr.push(this.getDate());
    }
    arr.push(`[${this.getFilename()}]`);
    arr.push(figures.pointerSmall);
    return arr.map(item => chalk.grey(item));
  }

  buildSignale(type, ...args) {
    let msg = {};

    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
      if (args[0] instanceof Error) {
        [msg] = args;
      } else {
        const [{ message }] = args;
        msg = message;
      }
    } else {
      msg = args.join(' ');
    }

    const signale = this.generateMeta();

    signale.push(chalk[type.color](type.badge));

    if (type.label) {
      signale.push(chalk[type.color](type.label));
    }

    if (msg instanceof Error) {
      const [name, ...rest] = msg.stack.split('\n');
      signale.push(name);
      signale.push(chalk.grey(rest.map(l => l.replace(/^/, '\n')).join('')));
      return signale.join(' ');
    }

    signale.push(msg);

    return signale.join(' ');
  }

  time(label) {
    if (!label) {
      label = `timer_${this.timers.size}`;
    }

    this.timers.set(label, Date.now());
    const message = this.generateMeta();

    const report = [
      chalk.green(this.types.start.badge),
      chalk.green.underline(label),
      'Initialized timer...',
    ];

    message.push(...report);
    this.createLog(message.join(' '));
    return label;
  }

  timeEnd(label) {
    if (!label && this.timers.size) {
      const is = x => x.includes('timer_');
      label = [...this.timers.keys()].reduceRight((x, y) => {
        return is(x) ? x : is(y) ? y : null;
      });
    }
    if (this.timers.has(label)) {
      const span = timeSpan(this.timers.get(label));
      this.timers.delete(label);

      const message = this.generateMeta();
      const report = [
        chalk.red(this.types.pause.badge.padEnd(2)),
        chalk.red.underline(label),
        'Timer run for:',
        chalk.yellow(span < 1000 ? span + 'ms' : (span / 1000).toFixed(2) + 's'),
      ];

      message.push(...report);

      this.createLog(message.join(' '));
      return { label, span };
    }
  }
}

module.exports = Object.assign(new Signale(), { Signale });
