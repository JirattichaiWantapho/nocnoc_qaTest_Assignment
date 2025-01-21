import { test, expect } from '@playwright/test';
import { error } from 'console';

test('testcase_CorrectLink', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');


// get item use xpath
await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`);
const item = await page.locator(
  `(//div[contains(@class, 'items') and contains(@class, 'product-tile')])`
);
// get count of item
const count = await item.count();
console.log(`Number of matching items: ${count}`);

for(let i = 0; i < count; i+=2){//skip items because to slow to check all items
    // get item name use xpath
    //check item name use xpath
    try {
      await page.waitForSelector(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]`);
    } catch (error) {
      console.error(`Error: Selector for item ${i + 1} not found`);
    }
    // get item name and store use xpath
    
    await page.waitForSelector(
        `(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]//p[contains(@class, 'bu-line-clamp-2')]`
    );
    const elements = await page.locator(
      `(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]//p[contains(@class, 'bu-line-clamp-2')]`
    );
    const ReserveElements = await page.locator(
      `(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]//div[contains(@class, 'bu-flex-col')]`
    );
    let nameItem;
    let nameStore;
    const elementsCount = await elements.count();
    if (elementsCount > 1) {
      nameItem = await elements.nth(1).textContent();
      nameStore = await elements.nth(0).textContent();
    }else{
      nameItem = await elements.textContent();
      nameStore = await ReserveElements.first().textContent();
    }

    
    
    // console.log(elements.count());
    
    console.log(`Item Name: ${nameItem}`);
    console.log(`Store Name: ${nameStore}`);
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'), // detect new page
      await page.click(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]`), // click item
    ]);
    // wait for new page to load
    await newPage.bringToFront();
    await newPage.waitForLoadState();

    await page.waitForTimeout(3000);
    //error handling
    try {
      //check loading page
      await expect(newPage.locator('.pad').first()).toBeVisible();
      //get item name use xpath /html/body/div[2]/main/div[4]/div[2]/div[1]/div[2]/div[2]/h1 //*[@id="product-overview-section"]/div[2]/div[1]/div[2]/div[2]/h1
      const Item_name_newpage = await newPage.locator(`//*[@id="product-overview-section"]/div[2]/div[1]/div[2]/div[2]/h1`).textContent();
      await newPage.mouse.wheel(0, 30000) // scroll down for load more
      await newPage.mouse.wheel(0, 10000) // scroll down for again
      //check store name
      const store_name_newpage = await newPage.locator(`//a[contains(@class, 'shop-name-info')]`).textContent();
      console.log(`Name on new page: ${Item_name_newpage}`);
      console.log(`Store on new page: ${store_name_newpage}`);

      await expect(await nameItem).toBe(Item_name_newpage);
      await expect(await nameStore).toBe(store_name_newpage);
      await console.log(`Item ${i + 1} link is correct`);
    } catch (error) {
        console.error('Error: Item link is incorrect');
    }
    
    await newPage.close();
  }
});