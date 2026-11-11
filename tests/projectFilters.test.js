import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../src/data/projects.js';

test('projects have valid statusCode mappings', () => {
  for (const proj of PROJECTS) {
    assert.ok(
      ['published', 'archived', 'draft'].includes(proj.statusCode),
      `Project ${proj.id} has invalid statusCode: ${proj.statusCode}`
    );
  }
});

test('filtering by published returns live builds without empty archive', () => {
  const published = PROJECTS.filter((p) => p.statusCode === 'published');
  assert.ok(published.length >= 3, 'Should have at least 3 published projects');
  assert.ok(published.some((p) => p.id === 'proj-01'));
});

test('filtering by draft returns active research and prototypes', () => {
  const drafts = PROJECTS.filter((p) => p.statusCode === 'draft');
  assert.ok(drafts.length >= 2, 'Should have at least 2 in-lab drafts');
});

test('filtering by archived returns archived projects without zero results', () => {
  const archived = PROJECTS.filter((p) => p.statusCode === 'archived');
  assert.ok(archived.length >= 1, 'Should have at least 1 archived build');
});
