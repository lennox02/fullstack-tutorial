import { cleanup } from '../../test-utils';

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");
const sleep = require("sleep");

const appURL = "http://localhost:3000";
const testEmail = "Test@test.com";


describe('Main Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('Can reach home page after logging in', async () => {
  let driver = new Builder().forBrowser('firefox').build();
      // driver = await driver.build();
      driver.get(appURL);
      //Get the email field, 
      let emailField = await driver.findElement(By.name("email"));
      //Send keys to the input
      await emailField.sendKeys(testEmail);
      //submit / login
      await emailField.sendKeys(Key.ENTER);
    try{
      //verify we got to the homepage
      let email = await driver.wait(until.elementLocated(By.className("css-1sykydy")), 10000);
      let emailText = await email.getText();
      assert.equal(emailText, "TEST@TEST.COM", "Able to login and reach the home page");
    }finally{
      await driver.quit();
    } 
  }, 30000); //timeout after 30seconds

  
});
