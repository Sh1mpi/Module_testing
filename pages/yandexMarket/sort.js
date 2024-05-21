const BasePage = require("../../pages/basepage");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

class marketPage extends BasePage {
  constructor() {
    super();
  }

  async open() {
    await this.goToUrl("https://market.yandex.ru/");
    await driver.manage().addCookie({
      name: "spravka",
      value:
        "dD0xNzE0OTI1MDg0O2k9MjEyLjQ2LjEwLjg4O0Q9QkIxMjBCMjA1OUNBMjgxREFCNjRBN0EwNzRBQTRBMTY4RDczQTBCNjQ5QjE5Q0ZFQjgxNUU2RkREM0FBODkzODlFRjAyNUQ4NUZFMEU1RUU5Rjc4RkRDNDI4OTc0ODM5OTY4QUMwREFENzY5QTE5MTNEOURBMkE5RDdFOUU2QTQ2NERDMzREOTFFNTkwOEMwRjc2NTU4NTBEM0VFODA4RTdERThDRTlGNDI5ODQ1RjJBOTBGM0ZBM0I2O3U9MTcxNDkyNTA4NDQzNjA0MTY5MDtoPTg1NzQxN2M1ZjAxZDJkMTc5ZWU1ZDgzMzMyY2I5NGQ3",
    });
    driver.manage().window().maximize();
  }

  async checkHeader(header) {
    return header === (await driver.findElement(By.xpath("//h1")).getText());
  }

  async clickCatalogButton() {
    await this.click(
      By.xpath(
        "//button[@class='_30-fz button-focus-ring Hkr1q _1pHod _2rdh3 _3rbM-']"
      )
    );
  }

  async clickBigCategory() {
    await this.click(
      By.xpath("//li//a[@href='/catalog--kompiuternaia-tekhnika/54425']")
    );
  }

  async clickMediumCategory() {
    await this.click(
      By.xpath(
        '//div[@class="_1jFQq _1eGsE pttHu"]//a[@href="https://market.yandex.ru/catalog--kompiuternye-komplektuiushchie/54536?hid=91018"]'
      )
    );
  }

  async clickSmallCategory() {
    await this.click(
      By.xpath(
        '//div[@class="_1jFQq _1eGsE pttHu"]//a[@href="https://market.yandex.ru/catalog--vnutrennie-zhestkie-diski/55316/list?hid=91033&allowCollapsing=1&local-offers-first=0"]'
      )
    );
  }

  async logFirstFiveProducts() {
    let productNames = await driver.findElements(
      By.xpath(
        '//div[@data-auto="SerpList"]/child::div//div[@class="m4M-1"]//h3'
      )
    );

    let productPrices = await driver.findElements(
      By.xpath('//div[@data-auto="SerpList"]/child::div//span[@class="_1ArMm"]')
    );
    for (let i = 0; i < 5; i++) {
      console.log(
        `Product: ${await productNames[
          i
        ].getText()}, price: ${await productPrices[i].getText()} руб.`
      );
    }
  }

  async clickCheap() {
    await this.click(
      By.xpath(
        "//div[@class='_2Ios3']/child::button[@data-autotest-id='aprice']"
      )
    );
  }


  async checkCheapProducts() {
    let productNames = await driver.findElements(
      By.xpath(
        '//div[@data-auto="SerpList"]/child::div//div[contains(@class, "_2rw4E D81hX")]//h3'
      )
    );

    let productPrices = await driver.findElements(
      By.xpath('//div[@data-auto="SerpList"]/child::div//div[contains(@class, "_2rw4E D81hX")]//span[@class="_1ArMm"]')
    );
    for (let i = 0; i < 10; i++) {
      if (await productPrices[i].getText() <= await productPrices[i+1].getText()){
        console.log(
          `Product: ${await productNames[
            i
          ].getText()}, price: ${await productPrices[i].getText()} руб.`
        );
      }
      else {
        console.log(
          `сортировка по цене не сработала`,
          await productPrices[i].getText(),await productPrices[i+1].getText()
        );
      }
    }
  }
}

module.exports = marketPage;