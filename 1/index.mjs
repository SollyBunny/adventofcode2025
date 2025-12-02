#!/bin/env node

import fs from "fs/promises";

function parseInstructions(text) {
	return text
		.split("\n")
		.filter(x => x)
		.map(x => parseInt(x.slice(1)) * (x[0] === "L" ? -1 : 1))
}

const instructions = parseInstructions(await fs.readFile("input.txt", "utf-8"));

let dial = 50;
let zeroCount = 0;

for (const instruction of instructions) {
	dial += instruction;
	while (dial >= 100)
		dial -= 100;
	while (dial < 0)
		dial += 100
	if (dial === 0)
		zeroCount++;
}

console.log(zeroCount);
