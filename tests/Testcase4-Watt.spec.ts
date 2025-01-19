import { test, expect } from '@playwright/test';

test('testcase_Watt', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  await page.getByRole('button', { name: 'กรองการค้นหา' }).click();
  await page.locator('div').filter({ hasText: /^กำลังไฟฟ้า \(วัตต์\)$/ }).nth(1).click();
  await page.getByRole('textbox', { name: 'สูงสุด' }).fill('1999');
  await page.getByRole('textbox', { name: 'สูงสุด' }).press('Enter');
  //delay 1 second
  await page.waitForTimeout(3000);
  // get item use xpath
  await page.waitForSelector(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`);
  const item = await page.locator(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`);
  // get count of item
  const count = await item.count();
  console.log(`Number of matching items: ${count}`);
  // loop to check item
  for(let i = 0; i < count; i++){//skip items because to slow to check all items
    // get item name use xpath
    await page.waitForSelector(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]`);
    // await page.click(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]`);
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'), // ตรวจจับการเปิดแท็บใหม่
        await page.click(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]`), // คลิกเพื่อเปิดแท็บใหม่
    ]);
    // รอให้แท็บใหม่โหลด
    await newPage.bringToFront();
    await newPage.waitForLoadState();
    // คลิกที่ลิงค์ "คุณสมบัติสินค้า"
    await page.waitForTimeout(3000);
    await expect(newPage.locator('.pad').first()).toBeVisible();
    await newPage.mouse.wheel(0, 25000)
    await newPage.getByRole('link', { name: 'คุณสมบัติสินค้า' }).click();
    const powerText = await newPage.locator('tr:has(td:text("กำลังไฟ (วัตต์)")) td:nth-child(2)').textContent();
    const power = parseInt(powerText?.trim() || '0', 10);
    console.log('กำลังไฟ:', power);
    await newPage.close();
  }
});