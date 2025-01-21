import { test, expect } from '@playwright/test';
import { error } from 'console';

test('testcase_Service', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  await page.getByRole('button', { name: 'กรองการค้นหา' }).click();
  await page.getByRole('heading', { name: 'บริการประกอบ/ติดตั้ง' }).click();
  await page.getByRole('heading', { name: 'สินค้าที่มีบริการประกอบ/ติดตั้งฟรีจากผู้ขาย' }).click();

  // get item use xpath
  await page.waitForTimeout(2000);
  await page.waitForSelector(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])`);
  const item = await page.locator(
  `(//div[contains(@class, 'items') and contains(@class, 'product-tile')])`
  );
  // get count of item
  const count = await item.count();
  console.log(`Number of matching items: ${count}`);
  await page.waitForSelector(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])`);
  for(let i = 0; i < count; i++){//skip items because to slow to check all items 
    // get item name use xpath
    await page.waitForSelector(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]`);
    const element = page.locator(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]`);

    // find all text content
    const text = await element.textContent();
    // error handling 
    try {
      // check ติดตั้งฟรี
      await expect(text).toContain('ติดตั้งฟรี');
      console.log(`Item ${i + 1}: has 'ติดตั้งฟรี'`);
    } catch (error) {
      console.error(`Error: Item ${i + 1} does not have 'ติดตั้งฟรี'`);
    }
  }
});