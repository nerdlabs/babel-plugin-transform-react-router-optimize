const assert = require('assert');
const babel = require('babel-core');
const chalk = require('chalk');
const diff = require('diff');
const fs = require('fs');
const path = require('path');

const pluginPath = require.resolve('../distribution/index.js');

function runTests() {
	const testsPath = __dirname + '/fixtures/';

	fs.readdirSync(testsPath)
        .map((item) => ({ path: path.join(testsPath, item), name: item }))
        .filter((item) => fs.statSync(item.path).isDirectory())
        .forEach(runTest);
}

function runTest(dir) {
	const actual = babel.transformFileSync(dir.path + '/actual.js', {
		plugins: [pluginPath],
        babelrc: false
	});

	const expected = fs.readFileSync(dir.path + '/expected.js', 'utf-8');

	function normalizeLines(str) {
		return str.trimRight().replace(/\r\n/g, '\n');
	}

	process.stdout.write(chalk.bgWhite.black(dir.name));
	process.stdout.write('\n\n');

    diff.diffLines(normalizeLines(expected), normalizeLines(actual.code))
        .forEach((part) => {
            const colorize = part.added ? chalk.green :
                part.removed ? chalk.red : chalk.grey;

            process.stdout.write(colorize(part.value.trim()) + '\n');
        });

    assert.equal(normalizeLines(expected), normalizeLines(actual.code));

	process.stdout.write('\n\n\n');
}


runTests();