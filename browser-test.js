const puppeteer = require('puppeteer');
const colors = require('colors/safe');

async function test(name, callback) {
    console.log('-------------------------------------------') 
    console.log(colors.blue(`** ${name} Test: RUNNING`))
    let start = (new Date()).getTime()
    let result = await callback()
    let end = (new Date()).getTime()
    if (result) {
        console.log(colors.green(`** ${name} Test: PASSED (${(end-start)} ms)`))
    } else {
        console.log(colors.red(`** ${name} Test: FAILED (${(end-start)} ms)`))
        process.exit(1)
    }
}

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const [page] = await browser.pages();
    const timeout = 30000;
    page.setDefaultTimeout(timeout);

    await page.goto('https://zerosdev-swapi-starship.netlify.app', {
        waitUntil: ['domcontentloaded', 'networkidle0']
    })

    await test('API Request', async () => {
        await page.waitForXPath('//div[contains(@class, "starship-col")]');
        let count = (await page.$x('//div[contains(@class, "starship-col")]')).length
        return count > 0
    })

    await test('Infinite Scroll', async () => {
        let oldScrollHeight = await page.evaluate(() => document.querySelector('body').scrollHeight)
        await page.evaluate(() => {
            let element = document.querySelector('footer');
            if(element) {
              element.scrollIntoView();
            }
        });
        await page.waitForTimeout(3000)
        let count = (await page.$x('//div[contains(@class, "starship-col")]')).length
        let newScrollHeight = await page.evaluate(() => document.querySelector('body').scrollHeight)
        return (count > 0) && (newScrollHeight > oldScrollHeight)
    })

    await test('Search', async () => {
        await page.evaluate(() => {
            let element = document.querySelector('#search-keyword');
            if(element) {
              element.scrollIntoView();
            }
        });
        let [searchInput] = await page.$x('//input[@id="search-keyword"]')
        if (!searchInput) {
            return false
        }
        await searchInput.type('cr90', {delay: 50})
        await page.waitForTimeout(3000)
        let cols = await page.$x('//div[contains(@class, "starship-col")]')
        cols = cols.filter(async (col) => {
            let [title] = await col.$x('//a[contains(@class, "title")]')
            title = await title.evaluate((el) => el.innerText)
            return String(title).includes('cr90')
        })
        return cols.length > 0
    })

    await test('Detail Starship', async () => {
        let [col] = await page.$x('//div[contains(@class, "starship-col")]')
        let [detailButton] = await col.$x('//button[contains(@class, "btn-detail")]')
        if (!detailButton) {
            return false
        }
        let [starshipTitle] = await col.$x('//a[contains(@class, "title")]')
        starshipTitle = await starshipTitle.evaluate((el) => el.innerText)

        await detailButton.click()
        await page.waitForXPath('//div[contains(@class, "modal")]', {visible: true})
        await page.waitForTimeout(3000)
        
        let [modal] = await page.$x('//div[contains(@class, "modal")]')

        let tableFirstRow = await modal.$x('//table//tr//td')
        let tableTitle = await tableFirstRow[2].evaluate((el) => el.innerText)
        return tableTitle == starshipTitle
    })

    await browser.close()
})()