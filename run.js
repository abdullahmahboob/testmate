
const validate = require("./validate");

const receive = ({name, path, input, output: { success, failure }, flags = [] }) => (response) => {
    if(validate(success, response)) var strOut = `[Success] test: ${name}, path: ${path}${
        !flags.includes("ni") ? `, input: ${JSON.stringify(input)}` : "" }${
        !flags.includes("no") ? `, output: ${JSON.stringify(response)}` : "" }`;
    else var strOut = `[Failure] test: ${name}, path: ${path}${
        !flags.includes("ni") ? `, input: ${JSON.stringify(input)}` : "" }${
        !flags.includes("no") ? `, output: ${JSON.stringify(response)}` : "" }`.error;

    console.log(strOut);
}

const handle = ({ name, path, flags = [] }) => (error) =>
    console.log(`[Failure] test: ${name}, path: ${path}${
        !flags.includes("ni") ? `, input: ${JSON.stringify(input)}` : "" }${
        !flags.includes("no") ? `, output: ${JSON.stringify(error)}` : "" }`.error);


const runTest = ({ send, flags }) => ({ name, path, input, output: { success, failure } }) =>
    send(path, input)
    .then(receive({name, path, input, output: { success, failure }, flags }))
    .catch(handle({ name, path, input, flags }))

module.exports = run = async function(tests, { send, flags }) {
    await Promise.all(tests.map(runTest({ send, flags })));
}