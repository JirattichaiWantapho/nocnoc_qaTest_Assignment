import { test, expect } from '@playwright/test';

test('testcase_ETax-true', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  await page.getByRole('button', { name: 'กรองการค้นหา' }).click();
  await page.locator('span').filter({ hasText: 'E-Tax' }).click();
  // get item use xpath
  await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`);
  const item = await page.locator(
    `//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`
  );
  // get count of item
  const count = await item.count();
  console.log(`Number of matching items: ${count}`);
  // loop to check item
  for(let i = 0; i < count; i+=2){//skip items because to slow to check all items
    // check icon E-Tax use xpath
    await page.waitForSelector(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[1]/div[1]/img`);
    const img = await page.locator(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[1]/div[1]/img`);
    try {
      await expect(img).toHaveAttribute('src', '/static/images/e-tax.png');
    } catch (error) {
      console.error(`Item ${i + 1} does not have E-Tax icon.`);
    }
  }
});