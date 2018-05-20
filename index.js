#!/usr/bin/env node

const program = require('commander');
const execSync = require('child_process').execSync;

program.version(require("./package").version).parse(process.argv);

const tags = execSync(`git tag`).toString().split("\n");
const branch = execSync("git branch;").toString().substr(2).trim();

const currentVersion = "v" + require(`${process.cwd()}/package.json`).version;
const postfix = branch === "master" ? "" : `-${branch}`;
const currentTag = currentVersion + postfix;

if(tags.includes(currentTag)) {
	console.log(`Not publishing over existing tag ${currentTag}`);
	return process.exit(0);
}
else {
	execSync(`git tag ${currentTag}`);
	console.log(execSync(`git push --tags`).toString());
}