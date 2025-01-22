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

  // random click item
  const usedIndices = new Set();
  const numberOfChecks = 8;


  for(let i = 0; i < numberOfChecks; i++){

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * count) + 1;
    } while (usedIndices.has(randomIndex));
    usedIndices.add(randomIndex);
    // get item name use xpath
    //check item name use xpath
    
    try {
      await page.waitForSelector(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${randomIndex}]`);
    } catch (error) {
      console.error(`Error: Selector for item ${randomIndex} not found`);
    }
    // get item name and store use xpath
    
    await page.waitForSelector(
        `(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${randomIndex}]//p[contains(@class, 'bu-line-clamp-2')]`
    );
    const elements = await page.locator(
      `(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${randomIndex}]//p[contains(@class, 'bu-line-clamp-2')]`
    );
    const ReserveElements = await page.locator(
      `(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${randomIndex}]//div[contains(@class, 'bu-flex-col')]`
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
      if (nameStore && nameItem) {
        nameStore = nameStore.split(nameItem)[0].trim();
      }
    }

    
    
    // console.log(elements.count());
    
    console.log(`Item Name: ${nameItem}`, `Store Name: ${nameStore}`);
    
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'), // detect new page
      await page.click(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${randomIndex}]`), // click item
    ]);
    // wait for new page to load
    await newPage.bringToFront();
    await newPage.waitForLoadState();

    await page.waitForTimeout(1500);
    //error handling
    try {
      //check loading page
      await expect(newPage.locator('.pad').first()).toBeVisible();
      //get item name use xpath /html/body/div[2]/main/div[4]/div[2]/div[1]/div[2]/div[2]/h1 //*[@id="product-overview-section"]/div[2]/div[1]/div[2]/div[2]/h1
      const Item_name_newpage = await newPage.locator(`//h1[contains(@class, 'bu-typography-heading')]`).textContent();
      await newPage.mouse.wheel(0, 30000) // scroll down for load more
      await newPage.mouse.wheel(0, 10000) // scroll down for again
      //check store name
      const store_name_newpage = await newPage.locator(`//a[contains(@class, 'shop-name-info')]`).textContent();
      console.log(`Name on new page: ${Item_name_newpage}`, `Store on new page: ${store_name_newpage}`);


      await expect(await nameItem).toBe(Item_name_newpage);
      await expect(await nameStore).toBe(store_name_newpage);
      await console.log(`Item ${randomIndex} link is correct`);
    } catch (error) {
      
      console.error('Error: Item link is incorrect');
    }
    
    await newPage.close();
  }
});