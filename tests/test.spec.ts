import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('should not have axe errors', async ({ page }) => {
  await page.goto('/');
  
  const results = await new AxeBuilder({ page }).analyze();
  
  expect(results.violations).toStrictEqual([]); 
});

test('should not have visual regressions', async ({ page }) => {
  await page.goto('/');
  
  await expect(page).toHaveScreenshot('contrast-default.png');
})