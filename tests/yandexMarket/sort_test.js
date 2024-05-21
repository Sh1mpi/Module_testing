const marketPage = require("../../pages/yandexMarket/sort");
const mocha = require("mocha");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");
const { allure } = require("allure-mocha/dist/MochaAllureReporter");

mocha.describe("Yandex Market Add to bag test", function () {
  const ybp = new marketPage();

  before(async function () {
    await ybp.open();
  });

  after(async function () {
    await ybp.closeBrowser();
  });

  it("check cheap product", async function () {
    await allure.step("open category", async function () {
      await ybp.clickCatalogButton();
      await ybp.clickBigCategory();
      await ybp.clickMediumCategory();
      await ybp.clickSmallCategory();
      await ybp.checkHeader("Внутренние жесткие диски");
    });

    await allure.step("log products", async function () {
      await ybp.logFirstFiveProducts();

    });
    
    await allure.step("check", async function () {
      console.log('проверка сортировки по цене');
      await ybp.clickCheap();
      await driver.sleep(3000);
      await ybp.checkCheapProducts()
    });
  });
});