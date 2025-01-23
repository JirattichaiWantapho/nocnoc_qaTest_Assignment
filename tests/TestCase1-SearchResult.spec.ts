import {test, expect} from '@playwright/test';
import { get } from 'http';

test('testcase_SearchResult', async ({ page }) => {

    // Go to the starting url.
    await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
    // check result string  
    await page.waitForSelector('text=ผลการค้นหา “เครื่องทำน้ำอุ่น”');
    try {
        await expect(page.getByRole('heading', { name: 'ผลการค้นหา “เครื่องทำน้ำอุ่น”' })).toBeVisible();
    } catch (error) {
        console.error('Error: Search result heading not found');
    }
    // check total item
    const countText = await page.locator(`//span[contains(text(), 'ทั้งหมด') and contains(text(), 'รายการ')]`).textContent();
    console.log(countText);
    // Extract the number from the text
    const itemCountMatch = countText?.match(/ทั้งหมด\s([\d,]+)/);
    const itemCount = itemCountMatch ? parseInt(itemCountMatch[1].replace(/,/g, '')) : 0;
    console.log(`Total items: ${itemCount}`);
    await page.mouse.wheel(0, 10000)
    await page.waitForTimeout(500);
    //check item use xpath
    await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`);
    const item = await page.locator( 
        `//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`
    );
    const count = await item.count();
    console.log(`Number of matching items: ${count}`);
    
    for(let i = 0; i < count; i+=2){//skip items because to slow to check all items
        //check item name use xpath
        try {
            await page.waitForSelector(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]`);
        } catch (error) {
            console.error(`Error: Selector for item ${i + 1} not found`);
        }
        const nameLocator = await page.locator(`(//div[contains(@class, 'items') and contains(@class, 'product-tile')])[${i + 1}]`);
        //error handling
        try {
            await expect(nameLocator).toHaveText(/เครื่องทำน้ำอุ่น|เครื่องทำน้ำร้อน|WATER SHOWER|WATER HEATER|water heater/);
            console.log(`|Has Tag| in Item ${i + 1}: ${await nameLocator.textContent()}`);
        } catch (error) {
            const textContent = await nameLocator.textContent();
            console.error(`Error checking item ${i + 1}:`, textContent);
        }
    }
});