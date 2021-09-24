module.exports = getTests = function (types = ["rest", "duplex", "graphql"]) {
  if (![Array, Object].includes(types.constructor)) types = [types];
  if (types.constructor !== Object) {
    types = types.length ? types : ["rest", "duplex", "graphql"];
    types = types.reduce((acc, curr) => ({ ...acc, [curr]: {} }), {});
  }

  // Verify types.
  Object.keys(types).forEach((channel) => {
    if (!["rest", "duplex", "graphql"].includes(channel))
      throw new Error(`Channel ${channel} is not valid.`);
  });

  const tests = {};
  for (const t in types)
    tests[t] = require(`./${t}`).slice(
      types[t].start,
      types[t].end !== undefined ? Number(types[t].end) + 1 : undefined
    );

  return tests;
};
