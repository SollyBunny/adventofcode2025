#!/bin/env node

import fs from "fs/promises";

function parseBanks(text) {
	return text
		.split("\n")
		.filter(x => x)
		.map(x => x.split("").map(y => parseInt(y)))
}

const banks = parseBanks(await fs.readFile("input.txt", "utf-8"));

// Part 1

{
	function getSafeBankJoltage(bank) {
		let largest = 0;
		for (let i = 0; i < bank.length - 1; ++i) {
			for (let j = i + 1; j < bank.length; ++j) {
				const value = bank[i] * 10 + bank[j];
				largest = Math.max(largest, value);
			}
		}
		return largest;
	}

	let output = 0;
	for (const bank of banks) {
		output += getSafeBankJoltage(bank);
	}
	console.log("Part 1:", output);
}

// Part 2

{
	function getBankJoltage(bank) {
		const maxDigits = 12;
		let largest = 0;
		let nodes = [];
		nodes.push({ value: 0, digits: 0, i: 0 });
		while (nodes.length) {
			nodes.sort((a, b) => b.i - a.i); // BFS with i
			const node = nodes.pop();
			for (let i = node.i; i < bank.length; ++i) {
				if (i + (maxDigits - node.digits) > bank.length) // Must be possible to add the rest of the digits
					break;
				const value = node.value + (bank[i] * (10 ** (maxDigits - node.digits - 1)));
				if (value < largest) // Largest will have the same number of digits or less
					continue;
				largest = value;
				if (node.digits < maxDigits - 1)
					nodes.push({ value, digits: node.digits + 1, i: i + 1});
			}
		}
		return largest;
	}

	let output = 0;
	for (const bank of banks) {
		output += getBankJoltage(bank);
	}
	console.log("Part 2:", output);
}
