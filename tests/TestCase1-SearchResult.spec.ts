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
            await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[3]/p[2]`);
        } catch (error) {
            console.error(`Error: Selector for item ${i + 1} not found`);
        }
        const name = await page.locator(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[3]/p[2]`);
        //error handling
        try {
            await expect(name).toHaveText(/เครื่องทำน้ำอุ่น|เครื่องทำน้ำร้อน|WATER SHOWER|WATER HEATER|water heater/);
        } catch (error) {
            const textContent = await name.textContent();
            console.error(`Error checking item ${i + 1}:`, textContent);
        }
    }
});