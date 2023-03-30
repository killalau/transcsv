#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const program = require('commander');
const translator = require('translateer');
const ora = require('ora');
const { version = '0.0.0' } = require('../package.json');

// Progress spinner
const progress = {
  _spinner: null,
  counter: 0,
  get spinner() {
    return this._spinner = this._spinner || ora().start();
  },
  tick: function () {
    this.spinner.text = `${++this.counter} words translated`;
  },
  done: function () {
    this.spinner.succeed(`${this.counter} words translated`);
  },
  terminate: function (err) {
    this.spinner.fail(err);
  },
};

function programTerminate(err) {
  progress.terminate(err);
  process.exit(1);
}

// Main program
program
  .version(version)
  .option('-f, --from <fromLang>', 'from language, default is auto detect')
  .option('-t, --to <toLang>', 'to language, default is English')
  .arguments('<inputFile> <range> <outputFile>')
  .action((inputFile, range, outputFile) => {
    try {
      console.log('from', program.from);
      console.log('to', program.to);
      console.log('args', inputFile, range, outputFile);
    } catch (err) { programTerminate(err) }
  });

program.parse(process.argv);
