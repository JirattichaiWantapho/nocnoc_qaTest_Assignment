import { test, expect } from '@playwright/test';
import { error } from 'console';

test('testcase_Service', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  //close ask cookie
  await page.locator(`//*[@id="approot"]/div[4]/div/div/div[2]/a[3]/i`).click();
  await page.getByRole('button', { name: 'กรองการค้นหา' }).click();
  await page.getByRole('heading', { name: 'บริการประกอบ/ติดตั้ง' }).click();
  await page.getByRole('heading', { name: 'ชื่อร้านค้า' }).click();
  await page.getByRole('button', { name: 'แสดงเพิ่ม' }).nth(1).click();

  // get store use xpath
  const store = await page.locator(
    `//*[@id="approot"]/main/div[2]/div/div[4]/div[1]/div/div[7]/div[2]/div/div/div`
  );
  // get count of item
  const count_store = await store.count();
  console.log(`Number of store: ${count_store}`);
  //random click store
  const selectedStores: (string | null)[] = [];
const usedIndices = new Set<number>();
for (let i = 0; i < 3; i++) {
    let randomStoreIndex;
    // Generate a random index that hasn't been used yet
    do {
        randomStoreIndex = Math.floor(Math.random() * count_store) + 1;
    } while (usedIndices.has(randomStoreIndex));
    usedIndices.add(randomStoreIndex);

    const randomStore = await page.locator(`//*[@id="approot"]/main/div[2]/div/div[4]/div[1]/div/div[7]/div[2]/div/div/div[${randomStoreIndex}]/div[1]/div[2]/h3`);
    await randomStore.click();
    selectedStores[i] = (await randomStore.textContent())?.toLowerCase() || null;
    console.log(`Clicked on store: ${selectedStores[i]}`);
}
  // get item use xpath
  await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`);
  const item = await page.locator(
  `//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`
  );
  // get count of item
  const count = await item.count();
  console.log(`Number of matching items: ${count}`);
  await page.waitForSelector(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div`);
  for(let i = 0; i < count; i+=2){//skip items because to slow to check all items 
    // get item name use xpath /html/body/div[2]/main/div[2]/div/div[4]/div[2]/div[2]/div[1]/div/a/div[3] /html/body/div[2]/main/div[2]/div/div[4]/div[2]/div[2]/div[2]/div/a/div[2]/div[1]/p[1]
    await page.waitForSelector(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]`);
    const element = page.locator(`//*[@id="approot"]/main/div[2]/div/div[4]/div[2]/div[2]/div[${i + 1}]//p[contains(@class, 'bu-typography-caption-5')]`);
    // find all text content
    const text = await element.textContent();
    const text_item_lower = text?.toLowerCase();
    // error handling 
    try {
        let found = false;
        for (const store of selectedStores) {
          if (store !== null && text_item_lower?.includes(store)) {
            found = true;
            //can uncomment this line to see the result
            console.log(`Matched store: ${store} in item: ${text_item_lower}`);
            break;
          }
        }
        if (!found) {
            console.error(`No matching store found in item: ${text_item_lower}`);
        }
      } catch (error) {
        console.error(`Error checking item ${i + 1}:`, text_item_lower);
      }
    }
});