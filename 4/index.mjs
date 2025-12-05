#!/bin/env node

import fs from "fs/promises";

class Grid {
	constructor(data) {
		this.w = data[0].length;
		this.h = data.length;
		this.data = data;
	}
	get(x, y) {
		return this.data[y]?.[x];
	}
	set(x, y, value) {
		this.data[y][x] = value;
	}
	str() {
		return this.data.map(x => x.join("")).join("\n");
	}
}

function parseInput(text) {
	const data = text
		.split("\n")
		.filter(x => x)
		.map(x => x.split(""))
	return new Grid(data);
}

const grid = parseInput(await fs.readFile("input.txt", "utf-8"));

// Part 1

{
	let count = 0;

	for (let y = 0; y < grid.h; ++y) {
		for (let x = 0; x < grid.w; ++x) {
			if (grid.get(x, y) !== "@")
				continue;
			let adjacent = 0;
			for (const [dx, dy] of [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]])
			{
				if (grid.get(x + dx, y + dy) === "@")
					adjacent += 1;
			}
			if (adjacent < 4)
				count += 1;
		}
	}

	console.log("Part 1:", count);
}

// Part 2

{
	let count = 0;
	let edits;
	do {
		edits = [];

		for (let y = 0; y < grid.h; ++y) {
			for (let x = 0; x < grid.w; ++x) {
				if (grid.get(x, y) !== "@")
					continue;
				let adjacent = 0;
				for (const [dx, dy] of [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]])
				{
					if (grid.get(x + dx, y + dy) === "@")
						adjacent += 1;
				}
				if (adjacent < 4)
					edits.push([x, y]);
			}
		}

		for (const [x, y] of edits) {
			count += 1;
			grid.set(x, y, ".");
		}
	} while (edits.length);

	console.log("Part 2:", count);
}
