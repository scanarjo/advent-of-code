import { Buffer } from 'node:buffer';

import { fetchPuzzleInput, readLinesFromFileBuffer } from '../utils.ts';
import { isSafe, isSafeEnough, parseReport } from './lib.ts';

const input = await fetchPuzzleInput(2024, 2);

const buffer = Buffer.from(input);

const lines = readLinesFromFileBuffer(buffer);

const reports = lines.map(parseReport);

const countResults = (results: boolean[]) => results.filter(Boolean).length;

const safeReportCount = countResults(reports.map(isSafe));

console.log('Part 1: There are', safeReportCount, 'safe reports');

const safeEnoughReportCount = countResults(reports.map(isSafeEnough));

console.log('Part 2: There are', safeEnoughReportCount, 'safe enough reports');
