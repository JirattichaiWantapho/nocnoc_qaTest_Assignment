import { test, expect } from '@playwright/test';
import { error } from 'console';

test('testcase_Service', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  await page.getByRole('button', { name: 'กรองการค้นหา' }).click();
  await page.getByRole('heading', { name: 'บริการประกอบ/ติดตั้ง' }).click();
  await page.getByRole('heading', { name: 'สินค้าที่มีบริการประกอบ/ติดตั้งฟรีจากผู้ขาย' }).click();

// get item use xpath
await page.waitForTimeout(3000);
await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`);
const item = await page.locator(
  `//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`
);
// get count of item
const count = await item.count();
console.log(`Number of matching items: ${count}`);
await page.waitForSelector(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`);
for(let i = 0; i < count; i+=2){//skip items because to slow to check all items
    // get item name use xpath
    await page.waitForSelector(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]`);
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'), // ตรวจจับการเปิดแท็บใหม่
      await page.click(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]`), // คลิกเพื่อเปิดแท็บใหม่
    ]);
    // รอให้แท็บใหม่โหลด
    await newPage.bringToFront();
    await newPage.waitForLoadState();

    await page.waitForTimeout(3000);
    //error handling
    try {
        await expect(newPage.locator('.pad').first()).toBeVisible();
        await expect(newPage.getByRole('img', { name: 'tag image of Product with' }).first()).toBeVisible();
    } catch (error) {
        const name_item = await newPage.locator(`//*[@id="product-overview-section"]/div[2]/div[1]/div[2]/div[2]/h1`).textContent()
        console.error('Error: Product does not have service tag : ', name_item);
    }
    
    await newPage.close();
  }
});