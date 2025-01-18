import { test, expect } from '@playwright/test';
import { it } from 'node:test';
test('testcase_ETax-false', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  //await page.getByRole('link', { name: 'ยอมรับทั้งหมด' }).click();
  await page.getByRole('button', { name: 'กรองการค้นหา' }).click();
  //await page.locator('div').filter({ hasText: /^E-Tax$/ }).nth(3).click();
  // expect(await page.getByText('ช้อปดีมีคืน: E-Tax')).toBeVisible();
  const item = await page.locator(
    `//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`
  );
  let item_not_e_tax = 0;
  const count = await item.count();
  console.log(`Number of matching items: ${count}`);
  for(let i = 0; i < count; i++){
    await console.log(`Checking item ${i + 1}`);
    const img = await page.locator(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[1]/div[1]/img`);
    if(await img.count() === 0){
      item_not_e_tax++;
      await console.log(`Item ${i + 1} does not have an image`);
    } else if(await img.getAttribute('src') === '/static/images/e-tax.png'){
      await console.log(`Item ${i + 1} has E-Tax`);      
    } else {
      item_not_e_tax++;
      await console.log(`Item ${i + 1} does not have E-Tax`);
    }
  }
  await expect(item_not_e_tax).toBeGreaterThan(0);
});
test('testcase_ETax-true', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  //await page.getByRole('link', { name: 'ยอมรับทั้งหมด' }).click();
  await page.getByRole('button', { name: 'กรองการค้นหา' }).click();
  await page.locator('div').filter({ hasText: /^E-Tax$/ }).nth(3).click();
  // expect(await page.getByText('ช้อปดีมีคืน: E-Tax')).toBeVisible();
  const item = await page.locator(
    `//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`
  );
  const count = await item.count();//*[@id="product_12485092_19477B2D287"]/a/div[1]/div[1]/img
  console.log(`Number of matching items: ${count}`);
  for(let i = 0; i < count; i++){
    await console.log(`Checking item ${i + 1}`);
    const img = await page.locator(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[1]/div[1]/img`);
    await expect(img).toHaveAttribute('src', '/static/images/e-tax.png');
  }
});