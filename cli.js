#!/usr/bin/env node
const yargs = require("yargs");

const { _ } = yargs
  .usage("Usage: <filename> flags=ni/no graphql=0/15 rest=9/9")
  .option("filename", {
    alias: "filename",
    describe: "Name of file containing the tests",
    type: "string",
  }).argv;

const execute = require("./");
execute(_);
