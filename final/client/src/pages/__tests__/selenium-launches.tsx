import { cleanup, wait } from "../../test-utils";

const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const sleep = require("sleep");

const appURL = "http://localhost:3000";
const testEmail = "Test@test.com";

describe("Launch Tests: ", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it("Launches load after logging into the application", async () => {
    //define webdriver
    let driver = new Builder().forBrowser("firefox").build();
    driver.get(appURL);
    //Get the email field,
    let emailField = await driver.wait(
      until.elementLocated(By.name("email")),
      10000
    );
    //Send keys to the input
    await emailField.sendKeys(testEmail);
    //submit / login
    await emailField.sendKeys(Key.ENTER);

    try {
      //grab the first launch and verify its loaded
      let launchOne = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[1]')),
        10000
      );
      let launchOneText = await launchOne.findElement(By.tagName("h3"));
      launchOneText = await launchOneText.getText();
      // sleep.sleep(3);
      //verify that the launch is there
      assert.equal(
        launchOneText,
        "Starlink-15 (v1.0)",
        "Launch one loaded on home page"
      );

      //grab the first launch text
      let launchTwenty = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[20]')),
        10000
      );
      let launchTwentyText = await launchTwenty.findElement(By.tagName("h3"));
      launchTwentyText = await launchTwentyText.getText();
      // sleep.sleep(3);
      //verify that the launch is there
      assert.equal(
        launchTwentyText,
        "Starlink 4",
        "Launch twenty loaded on home page"
      );
    } finally {
      await driver.quit();
    }
  }, 30000); //timeout after 30seconds

  it("Can View a launch", async () => {
    //define webdriver
    let driver = new Builder().forBrowser("firefox").build();
    driver.get(appURL);
    //Get the email field,
    let emailField = await driver.wait(
      until.elementLocated(By.name("email")),
      10000
    );
    //Send keys to the input
    await emailField.sendKeys(testEmail);
    //submit / login
    await emailField.sendKeys(Key.ENTER);

    try {
      //grab the first launch text
      let launchOne = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[1]')),
        10000
      );
      await launchOne.click();
      let url = await driver.getCurrentUrl();
      // sleep.sleep(3);
      //verify that we are on the correct url
      assert.equal(
        url,
        appURL + "/launch/109",
        "Can View the first launch on the list"
      );
    } finally {
      await driver.quit();
    }
  }, 30000); //timeout after 30seconds

  it("Can add launch to cart", async () => {
    //define webdriver
    let driver = new Builder().forBrowser("firefox").build();
    driver.get(appURL);
    //Get the email field,
    let emailField = await driver.wait(
      until.elementLocated(By.name("email")),
      10000
    );
    //Send keys to the input
    await emailField.sendKeys(testEmail);
    //submit / login
    await emailField.sendKeys(Key.ENTER);

    try {
      //grab the first launch text
      let launchOne = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[1]')),
        10000
      );
      await launchOne.click();
      // sleep.sleep(3);
      //find the add to cart button and click it
      let cartButton = await driver.wait(
        until.elementLocated(By.className("css-wwcn44")),
        10000
      );
      await cartButton.click();

      //navigate to the cart page and verify that the launch is there
      //grab the cart icon
      let cartIcon = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[2]')),
        10000
      );
      //simulate a click
      await cartIcon.click();
      //grab the new url
      let url = await driver.getCurrentUrl();
      //verify it is the cart page.
      assert.equal(url, appURL + "/cart", "Able to reach the cart via icon");

      //grab the first launch and verify its loaded
      let launchOneOnCartPage = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a')),
        10000
      );
      let launchOneTextOnCartPage = await launchOneOnCartPage.findElement(
        By.tagName("h3")
      );
      launchOneTextOnCartPage = await launchOneTextOnCartPage.getText();
      //verify that the launch is there
      assert.equal(
        launchOneTextOnCartPage,
        "Starlink-15 (v1.0)",
        "Launch one was added to cart"
      );
    } finally {
      await driver.quit();
    }
  }, 30000); //timeout after 30seconds

  it("Can remove launch from cart", async () => {
    //define webdriver
    let driver = new Builder().forBrowser("firefox").build();
    driver.get(appURL);
    //Get the email field,
    let emailField = await driver.wait(
      until.elementLocated(By.name("email")),
      10000
    );
    //Send keys to the input
    await emailField.sendKeys(testEmail);
    //submit / login
    await emailField.sendKeys(Key.ENTER);

    try {
      //grab the first launch text
      let launchOne = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[1]')),
        10000
      );
      await launchOne.click();
      // sleep.sleep(3);
      //find the add to cart button and click it
      let cartButton = await driver.wait(
        until.elementLocated(By.className("css-wwcn44")),
        10000
      );
      await cartButton.click();

      //navigate to the cart page and verify that the launch is there
      //grab the cart icon
      let cartIcon = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[2]')),
        10000
      );
      //simulate a click
      await cartIcon.click();
      //grab the new url
      let url = await driver.getCurrentUrl();
      //verify it is the cart page.
      assert.equal(url, appURL + "/cart", "Able to reach the cart via icon");

      //grab the first launch and verify its loaded
      let launchOneOnCartPage = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a')),
        10000
      );
      let launchOneTextOnCartPage = await launchOneOnCartPage.findElement(
        By.tagName("h3")
      );
      launchOneTextOnCartPage = await launchOneTextOnCartPage.getText();
      //verify that the launch is there
      assert.equal(
        launchOneTextOnCartPage,
        "Starlink-15 (v1.0)",
        "Launch one was added to cart"
      );

      //navigate back to the launch page
      await launchOneOnCartPage.click();
      cartButton = await driver.wait(
        until.elementLocated(By.className("css-wwcn44")),
        10000
      );
      await cartButton.click(); //remove from cart

      //go back to cart page
      cartIcon = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[2]')),
        10000
      );
      //simulate a click
      await cartIcon.click();

      //verify that there is no launch in the cart
      let emptyCartMessage = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/p')),
        10000
      );
      let emptyCartMessageText = await emptyCartMessage.getText();
      assert.equal(
        emptyCartMessageText,
        "No items in your cart",
        "Verified that launches can be removed from a cart"
      );
    } finally {
      await driver.quit();
    }
  }, 30000); //timeout after 30seconds

  //STATUS: when clicking book launch, test fails and errors out with database query error.
  it("Can book a launch", async () => {
    //define webdriver
    let driver = new Builder().forBrowser("firefox").build();
    driver.get(appURL);
    //Get the email field,
    let emailField = await driver.wait(
      until.elementLocated(By.name("email")),
      10000
    );
    //Send keys to the input
    await emailField.sendKeys(testEmail);
    //submit / login
    await emailField.sendKeys(Key.ENTER);

    try {
      //grab the first launch text
      let launchOne = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[1]')),
        10000
      );

      await launchOne.click();

      //find the add to cart button and click it
      let cartButton = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/div[3]/button')),
        10000
      );

      await cartButton.click();

      //navigate to the cart page and verify that the launch is there
      //grab the cart icon
      let cartIcon = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[2]')),
        10000
      );
      //simulate a click
      await cartIcon.click();

      //grab the new url
      let url = await driver.getCurrentUrl();
      //verify it is the cart page.
      assert.equal(url, appURL + "/cart", "Able to reach the cart via icon");
      //find the book launches button
      let bookLaunchesButton = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/button')),
        10000
      );
      //click the button
      await bookLaunchesButton.click();
      //get cart url
      await driver.get(driver.getCurrentUrl());
      let emptyCartMessage = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[2]/p'))
      );

      let emptyCartMessageText = await emptyCartMessage.getText();
      assert.equal(
        emptyCartMessageText,
        "No items in your cart",
        "Verified that launches can be removed from a cart"
      );
    } finally {
      await driver.quit();
    }
  }, 30000); //timeout after 30seconds
});
