#!/bin/env node

import fs from "fs/promises";

function parseRanges(text) {
	return text
		.split(",")
		.map(x => x.split("-"))
		.map(([a, b]) => [parseInt(a), parseInt(b)])
}

const ranges = parseRanges(await fs.readFile("input.txt", "utf-8"));

// Part 1

function isDupedNumber(num) {
	const s = String(num);
	if (s.length % 2 === 1) return false;
	const half = s.length / 2;
	return s.slice(0, half) === s.slice(half);
}

let invalidSum = 0;
for (const range of ranges) {
	for (let id = range[0]; id <= range[1]; id++) {
		if (isDupedNumber(id)) {
			invalidSum += id;
		}
	}
}

console.log("Part 1", invalidSum);

// Part 2

function isInvalidId(num) {
	const s = String(num);
	for (let i = 1; i <= Math.floor(s.length / 2); ++i) {
		if (s.length % i !== 0) continue;
		if (s.slice(0, i).repeat(s.length / i) === s) return true;
	}
	return false;
}

let actualInvalidSum = 0;
for (const range of ranges) {
	for (let id = range[0]; id <= range[1]; id++) {
		if (isInvalidId(id)) {
			actualInvalidSum += id;
		}
	}
}

console.log("Part 2", actualInvalidSum);
