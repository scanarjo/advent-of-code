import { fetchPuzzleInputLines } from '../utils.ts';
import { isSafe, isSafeEnough, parseReport } from './lib.ts';

const lines = await fetchPuzzleInputLines(2024, 2);

const reports = lines.map(parseReport);

const countResults = (results: boolean[]) => results.filter(Boolean).length;

const safeReportCount = countResults(reports.map(isSafe));

console.log('Part 1: There are', safeReportCount, 'safe reports');

const safeEnoughReportCount = countResults(reports.map(isSafeEnough));

console.log('Part 2: There are', safeEnoughReportCount, 'safe enough reports');
