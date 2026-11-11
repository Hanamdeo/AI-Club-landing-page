import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDate,
  formatEventDateRange,
  isUpcoming,
  isPast,
  getEndOfDayIST,
} from '../src/lib/dateUtils.js';

test('formatDate outputs consistent Indian Standard Time calendar date', () => {
  assert.equal(formatDate('2026-11-15'), '15 Nov 2026');
  assert.equal(formatDate('2026-11-15', 'full'), '15 November 2026');
  assert.equal(formatDate('2026-11-15', 'short'), '15 Nov');
});

test('formatEventDateRange handles multi-day events cleanly', () => {
  const range = formatEventDateRange('2026-11-15', '2026-11-17');
  assert.equal(range, '15–17 Nov 2026');

  const singleDay = formatEventDateRange('2026-11-22', '2026-11-22');
  assert.equal(singleDay, '22 Nov 2026');
});

test('multi-day events stay upcoming until final end date in IST', () => {
  // Event runs until end of 2026-11-17 IST
  const endTarget = getEndOfDayIST('2026-11-17');
  assert.ok(endTarget instanceof Date);
  assert.equal(endTarget.toISOString(), '2026-11-17T18:29:59.999Z');
});

test('past events are detected accurately', () => {
  assert.equal(isPast('2020-01-01'), true);
  assert.equal(isUpcoming('2020-01-01'), false);
});
