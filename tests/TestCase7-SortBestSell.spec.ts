import { test, expect } from '@playwright/test';
import { error } from 'console';

test('testcase_SortbyBestSell', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  //close ask cookie
  await page.locator(`//*[@id="approot"]/div[4]/div/div/div[2]/a[3]/i`).click();
  await page.locator('button').filter({ hasText: 'สินค้าแนะนำ' }).click();
  await page.getByLabel('สินค้าขายดี').click();
  //wait for load
  await page.waitForTimeout(2500);
  await page.mouse.wheel(0, 30000) // scroll down for load more
  await page.waitForTimeout(500);
  await page.mouse.wheel(0, 30000)
  await page.waitForTimeout(500);
  await page.mouse.wheel(0, 30000)
  // get item use xpath
  await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`);
  const item = await page.locator(
  `//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`
  );
  // get count of item
  const count = await item.count();
  console.log(`Number of matching items: ${count}`);
  let BestSell = 0;
  for(let i = 0; i < count; i++){
    //get count of item selled
    ///html/body/div[2]/main/div[2]/div/div[4]/div[2]/div[2]/div[1]/div/a/div[2]/div[4]/div[2]/p
    const count_item_Selled = await page.locator(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[3]/div[1]/div[1]/p`).textContent();
    try {} catch (error) {}
    // split text to get number
    const countItemText = count_item_Selled?.replace('ขายแล้ว', '').trim() || '';
    const rawText = countItemText.toLowerCase();
    let RealCount = 0;
    if (rawText.includes('k')) {
        RealCount = parseFloat(rawText.replace('k', '')) * 1000;
    } else {
        RealCount = parseFloat(rawText);
    }
    console.log(`Item ${i + 1} sell: ${RealCount}`);
    //check best sell
    if(BestSell == 0){
      BestSell = RealCount;
    }
    try {
      await expect(RealCount).toBeLessThanOrEqual(BestSell);
      BestSell = RealCount;
    } catch (error) {
      console.error(`Item ${i + 1} : ${RealCount} => sell more than Item ${i}: ${BestSell}`);
    }
  }
  
  
});