import {test, expect} from '@playwright/test';

test('testcase_SearchResult', async ({ page }) => {

    // Go to the starting url.
    await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
    // check result string  
    await expect(page.getByRole('heading', { name: 'ผลการค้นหา “เครื่องทำน้ำอุ่น”' })).toBeVisible();
    //check item
    await page.waitForSelector(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`);
    const item = await page.locator( 
        `//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div`
    );
    const count = await item.count();
    console.log(`Number of matching items: ${count}`);
    for(let i = 0; i < count; i++){
        await console.log(`Checking item ${i + 1}`);
        const name = await page.locator(`//*[@id="approot"]/main/div/div/div[4]/div[2]/div[2]/div[${i + 1}]/div/a/div[3]/p[2]`);
        await expect(name).toHaveText(/เครื่องทำน้ำอุ่น/);
    }
});