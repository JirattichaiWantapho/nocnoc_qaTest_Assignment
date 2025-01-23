import { test, expect } from '@playwright/test';
import { error } from 'console';

test('testcase_Price-HighToLow', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  //close ask cookie
  await page.locator(`//*[@id="approot"]/div[4]/div/div/div[2]/a[3]/i`).click();
  await page.locator('button').filter({ hasText: 'สินค้าแนะนำ' }).click();
  await page.getByText('ราคา: จากมาก-น้อย').click();

  //wait for load
  await page.waitForTimeout(2500);
  await page.mouse.wheel(0, 10000) // scroll down for load more
  await page.waitForTimeout(1000);


  // get item use xpath //*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[1]
  await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`);
  const item = await page.locator(
  `//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`
  );
  // get count of item
  const count = await item.count();
  console.log(`Number of matching items: ${count}`);
  let HighPrice = 0;
  for(let i = 0; i < count; i++){
    //get count of item selled
    ///html/body/div[2]/main/div[2]/div/div[4]/div[2]/div[2]/div[1]/div/a/div[2]/div[2]/div/span[1]/span[2] /html/body/div[2]/main/div[2]/div/div[4]/div[2]/div[2]/div[3]/div/a/div[2]/div[3]/div/span[1]/span[2] /html/body/div[2]/main/div[2]/div/div[4]/div[2]/div[2]/div[6]/div/a/div[2]/div[2]/div/span[1]/span[2]
    const Item_text = await page.locator(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div[${i + 1}]`).textContent();
    const priceMatch = Item_text?.match(/฿([\d,]+)/);
    const Price = priceMatch ? priceMatch[1] : '0';
    
    // split text to get number
    
    let NowPrice = Price ? parseFloat(Price.replace(',', '')) : 0;
    console.log(`Item ${i + 1} Price: ${NowPrice}`);
    // if (rawText.includes('k')) {
    //     NowPrice = parseFloat(rawText.replace('k', '')) * 1000;
    // } else {
    //     NowPrice = parseFloat(rawText);
    // }
    //check best sell
    if(HighPrice == 0){
      HighPrice = NowPrice;
    }
    try {
      await expect(NowPrice).toBeLessThanOrEqual(HighPrice);
      HighPrice = NowPrice;
    } catch (error) {
      console.error(`Item ${i + 1} : ${NowPrice} Price more than Item ${i}: ${HighPrice}`);
    }
  }
  
  
});
