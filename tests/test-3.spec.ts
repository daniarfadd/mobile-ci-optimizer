import { test, expect } from '@playwright/test';

test('test 5 - simulate delay', async () => {
  await new Promise(r => setTimeout(r, 3000));
  expect(1).toBe(1);
});

test('test 6 - simulate delay', async () => {
  await new Promise(r => setTimeout(r, 3000));
  expect(1).toBe(1);
});