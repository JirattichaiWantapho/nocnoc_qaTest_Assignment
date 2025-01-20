import { test, expect } from '@playwright/test';
import { error } from 'console';

test('testcase_Brand', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  await page.getByRole('button', { name: 'กรองการค้นหา' }).click();
  await page.getByRole('button', { name: 'แสดงเพิ่ม' }).click();
  // get item use xpath
  const brand = await page.locator(
    `//*[@id="approot"]/main/div/div/div[4]/div[1]/div/div[2]/div[2]/div/div/div`
  );
  // get count of item
  const count = await brand.count();
  console.log(`Number of matching brands: ${count}`);

  //random click brand
  const selectedBrands: (string | null)[] = [];
  for (let i = 0; i < 3; i++) {
    const randomBrandIndex = Math.floor(Math.random() * count) + 1;
    //get checkbox brand
    const randomBrand = await page.locator(`//*[@id="approot"]/main/div/div/div[4]/div[1]/div/div[2]/div[2]/div/div/div[${randomBrandIndex}]/div[1]/div[2]/h3`);
    await randomBrand.click();
    selectedBrands[i] = (await randomBrand.textContent())?.toLowerCase() || null;
    console.log(`Clicked on brand: ${selectedBrands[i]}`);
  }
  await page.waitForTimeout(2000);
  // get item use xpath
  await page.waitForSelector(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`);
  const item = await page.locator(
    `//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`
  );
  // get count of item
  const count_item = await item.count();
  console.log(`Number of matching items: ${count_item}`);
  for(let i = 0; i < count_item; i+=2){//skip items because to slow to check all items
    //check item name use xpath
    await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[3]/p[2]`);
    const name_item = await page.locator(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[3]/p[2]`).textContent();
    //change to item name to lower case
    const name_item_lower = name_item?.toLowerCase();
    //error handling check item name with 3 selected brand 
    try {
      let found = false;
      for (const brand of selectedBrands) {
        if (brand !== null && name_item_lower?.includes(brand)) {
          found = true;
          //can uncomment this line to see the result
          console.log(`Matched brand: ${brand} in item: ${name_item_lower}`);
          break;
        }
      }
    } catch (error) {
      console.error(`Error checking item ${i + 1}:`, name_item_lower);
    }
  }
});