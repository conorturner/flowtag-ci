#!/usr/bin/env node

const program = require('commander');
const execSync = require('child_process').execSync;

program
	.version(require("./package").version)
	.option('-b, --branch [branch]')
	.parse(process.argv);


const tags = execSync(`git tag`).toString().split("\n");
const branch = program.branch || execSync("git rev-parse --abbrev-ref HEAD;").toString();

const currentVersion = "v" + require(`${process.cwd()}/package.json`).version;
const postfix = branch === "master" ? "" : `-${branch}`;
const currentTag = currentVersion + postfix;

if(tags.includes(currentTag)) {
	console.log(`Not publishing over existing tag ${currentTag}`);
	return process.exit(0);
}
else {
	execSync(`git tag ${currentTag}`);
	console.log(`Tagged as: ${currentTag}`);
}