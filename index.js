const colors = require("colors");
const PostHandler = require("./handlers/post.handler");
const DuplexHandler = require("./handlers/duplex.handler");
const config = require("./config");
const run = require("./run");

// Setting terminal output color theme.
colors.setTheme({ error: "red", finished: "cyan" });

// const { CookieJar } = require("tough-cookie");
// const cookieJar = new CookieJar();

// Rest and Duplex handler.
const rest = new PostHandler(config);
const duplex = new DuplexHandler(config);
duplex.init({ ping: () => rest.send("/auth/ping", {}) });

const send = {
  rest: (...args) => rest.send(...args),
  duplex: (...args) => duplex.send(...args),
  graphql: (...args) => duplex.send(...args),
};

const dispose = () => duplex.dispose();
const finish = () => {
  console.log("\nTests completed.".finished);
  dispose();
};
const handle = (error) => {
  console.log("\nTests could not complete.".finished);
  duplex.onConnection(dispose);
};

function splitArgs(array, splitter) {
  return array.reduce((acc, current) => {
    const splitted = current.split(splitter);
    acc[splitted[0]] = splitted[1] ? splitted[1].split("/") : [];
    return acc;
  }, {});
}

module.exports = execute = async function (pArgs) {
  const args = splitArgs(pArgs, "=");
  // Extracting any flags.
  const { flags } = args;
  // Parsing the test ranges.
  const range = {};
  for (const t in args)
    if (t !== "flags") range[t] = { start: args[t][0], end: args[t][1] };

  const getTests = require(process.cwd());

  // Getting tests.
  const tests = getTests(range);

  // Running tests.
  try {
    for (const type in tests)
      await run(tests[type], { send: send[type], flags });

    finish();
  } catch (error) {
    handle(error);
  }
};

// If we this file is directly run instead of using the CLI.
if (require && require.main === module) {
  // Run tests:
  execute(process.argv.splice(2));
}
