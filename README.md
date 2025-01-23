# nocnoc_qaTest_Assignment
[Download the PDF Report](nocnoc_qa_report_.pdf)
## Objective
This project automates test cases for the Search Result Page using Playwright to verify functionality like search, filters, and sorting.

---

## Prerequisites
- Install Node.js: [Download here](https://nodejs.org)
- Clone this repository: [https://github.com/JirattichaiWantapho/nocnoc_qaTest_Assignment.git](https://github.com/JirattichaiWantapho/nocnoc_qaTest_Assignment.git)

---

## Installation
Install dependencies using npm:
```bash
npm install
npx playwright install
```

---

## Running Tests
Run all tests:
```bash
npx playwright test
```

Run a specific test:
```bash
npx playwright test <test_file>
```
Run tests in debug mode:
Debug mode pauses execution and allows inspection using Playwright Inspector
```bash
npx playwright test --debug
```
Run tests in headed mode:
Run tests with the browser visible (non-headless mode):
```bash
npx playwright test --headed
```
---
## Expected Results
- The console will display the results of the test runs (pass or fail).
- For detailed HTML reports, use the following command:
  ```bash
  npx playwright show-report
  ```
- If the test passes, only `stdout` is shown.
- If the test fails, it displays `stderr` (standard error):

## Example console output
1. Test Case Search Result
  ```bash
  |Has Tag| in Item 1: 123456Electrolux Official StoreElectrolux เครื่องทำน้ำอุ่น WATER HEATER UltimateHome 500 รุ่น EWE451QX-W45ขายแล้ว 20ผ่อน 0% มีขั้นต่ำติดตั้งฟรี฿3,399/ชิ้น ฿4,190 ประหยัด ฿791 
  |Has Tag| in Item 3: 123456STIEBEL ELTRON OFFICIAL STORESTIEBEL ELTRON เครื่องทำน้ำร้อน รุ่น DDH 8EC 8000 w สีเทาเข้ม DDH 8EC4.3ขายแล้ว 118ผ่อน 0% มีขั้นต่ำเพิ่มงานติดตั้งได้฿7,190/ชิ้น ฿9,390 ประหยัด ฿2,200 
  .
  .
  .
  1 passed
  ```
2. Test Case ETax
  ```bash
  Item 1 has E-Tax icon.
  Item 3 has E-Tax icon.
  .
  .
  .
  1 passed
  ```
3. Test Case Choose Brand
 ```bash
  Clicked on brand: m&e
  Clicked on brand: นพดลพาณิช
  Clicked on brand: hitachi.
  Number of matching items: 19
  Matched brand: m&e in item: 123456sangchai shopm&e เครื่องทำน้ำอุ่น 4500 วัตต์ รุ่น me45fb พร้อมชุด rain shower สุดพรีเมียม 4500 วัตต์ เครื่องทำน้ำอุ่น black4500 วัตต์฿5,832/ชิ้น ฿9,900 ประหยัด ฿4,068 ผ่อน 0% มีขั้นต่ำเพิ่มงานติดตั้งได้ขายแล้ว 3
  Matched brand: m&e in item: 12345sangchai shopm&e เครื่องทำน้ำร้อน แบบหม้อต้ม ขนาด 150 ลิตร รุ่น gmd1502500 วัตต์฿23,900/ชิ้น ฿28,625 ประหยัด ฿4,725
  .
  .
  .
  1 passed
  ```
4. Test Case Watt
 ```bash
  Filter by watt less than 1999
  Change max value to 4500
  .
  .
  .
  1 passed
  ```
  but in the test case, store might input the wrong watt value for some items
  ```bash
  Filter by watt less than 1999
  ERROR: Still have item less than 1999 watt                                                                                                                            
  Number of matching items: 4
  Item name: Thermo Maxx เครื่องทำน้ำร้อนพลังงานแสงอาทิตย์ 200 L, Watt: 240
  Item name: RHEEM เครื่องทำน้ำร้อนแบบหม้อต้ม ทรงนอน รุ่น 86H-55 ขนาด55ลิตร, Watt: 300
  Item name: RHEEM เครื่องทำน้ำร้อนหม้อต้ม รุ่น RCY-15 WHITE 1500 Watt พลาสติก ABS, Watt: 1500
  Item name: Stiebel Eltron เครื่องทำน้ำอุ่น WS 35E-2, WS 45E-2 WS 45 E2, Watt: 45
  .
  .
  .
  1 passed
   ```
5. Test Case Service
 ```bash
  Item 1: has 'ติดตั้งฟรี'
  Item 2: has 'ติดตั้งฟรี'
  .
  .
  .
  1 passed
  ```
6. Test Case Choose Store
 ```bash
  Clicked on store: aei industry
  Clicked on store: modern gas
  Clicked on store: phumjaishop168
  Number of matching items: 3
  Matched store: aei industry in item: aei industry
  Matched store: phumjaishop168 in item: phumjaishop168
  .
  .
  .
  1 passed
  ```
7. Test Case Sort by BestSell
 ```bash
  Item 1 sell: 3020
  Item 2 sell: 546
  .
  .
  .
  1 passed
  ```
  In test case ,I found some item not sort
```bash
  Item 27 sell: 61
  Item 27 : 61 => sell more than Item 26: 60                                                                                                                            
  Item 28 sell: 58
  .
  .
  .
  1 passed
  ```
8. Test Case Price-LowToHigh
 ```bash
  Item 1 Price: 40
  Item 2 Price: 119
  .
  .
  .
  1 passed
  ```
9. Test Case Price-HighToLow
 ```bash
  Item 1 Price: 94500
  Item 2 Price: 66000
  .
  .
  .
  1 passed
  ```
10. Test Case Check Navigator Correct Link
 ```bash
  Item Name: Panasonic เครื่องทำน้ำอุ่น V Series 3500W รุ่น DH-3VL1TW หัวฝักบัวเคลือบด้วย Ag+ Crystal  - รับประกันศูนย์ 5 ปี Store Name: Smart Life
  Name on new page: Panasonic เครื่องทำน้ำอุ่น V Series 3500W รุ่น DH-3VL1TW หัวฝักบัวเคลือบด้วย Ag+ Crystal  - รับประกันศูนย์ 5 ปี Store on new page: Smart Life       
  Item 37 link is correct                                                                                                                                               
  Item Name: Electrolux เครื่องทำน้ำอุ่น WATER HEATER UltimateHome 500 รุ่น EWE381QX-G4 Store Name: Electrolux Official Store
  Name on new page: Electrolux เครื่องทำน้ำอุ่น WATER HEATER UltimateHome 500 รุ่น EWE381QX-G4 Store on new page: Electrolux Official Store
  Item 10 link is correct
  .
  .
  .
  1 passed
  ```


---
## วัตถุประสงค์
โปรเจกต์นี้เป็นการทดสอบอัตโนมัติสำหรับหน้า Search Result Page โดยใช้ Playwright เพื่อตรวจสอบฟังก์ชันต่าง ๆ เช่น การค้นหา การกรอง และการจัดเรียงสินค้า


## ข้อกำหนดเบื้องต้น
- ติดตั้ง Node.js: [ดาวน์โหลดที่นี่](https://nodejs.org)
- Clone this repository:[https://github.com/JirattichaiWantapho/nocnoc_qaTest_Assignment.git](https://github.com/JirattichaiWantapho/nocnoc_qaTest_Assignment.git)


## การติดตั้ง
ติดตั้ง dependencies โดยใช้ npm:
```bash
npm install
npx playwright install
```


## การรันการทดสอบ
รันการทดสอบทั้งหมด:
```bash
npx playwright test
```

รันการทดสอบเฉพาะไฟล์:
```bash
npx playwright test <test_file>
```
รันการทดสอบในโหมดดีบัก:
```bash
npx playwright test --debug

```
## ผลลัพธ์ที่คาดหวัง
- คอนโซลจะแสดงผลลัพธ์ของการทดสอบ (ผ่านหรือไม่ผ่าน)
- หากต้องการรายงาน HTML แบบละเอียด ใช้คำสั่งต่อไปนี้:
  ```bash
  npx playwright show-report
  ```
