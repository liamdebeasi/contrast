import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('should not have axe errors', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  
  const results = await new AxeBuilder({ page }).analyze();
  
  expect(results.violations).toStrictEqual([]); 
});