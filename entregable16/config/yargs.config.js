const argv = require("yargs")
  .option("p", {
    alias: "PORT",
    type: "number",
    default: 8080,
    describe: 'PORT number to run the server'
  })
  .check((argv, options) => {
    if (isNaN(argv.p)) {
      throw "The port must be a number"
    }
    if (argv.p < 0 || argv.p >= 65536) {
      throw 'The port parameter must be a positive number >= 0 and < 65536'
    }
    return true
  }).argv

module.exports = argv