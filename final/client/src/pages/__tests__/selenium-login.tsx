import { cleanup } from '../../test-utils';

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");
const sleep = require("sleep");


describe('Login from Main Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('Verify we can login', async () => {

    //launches firefox browser
      let driver = await new Builder().forBrowser('firefox').build();
      try {
        //Go to the main page
        await driver.get('http://localhost:3000');

        //Get the email field, 
        let emailField = await driver.findElement(By.name("email"));

        //Send keys to the input
        await emailField.sendKeys("Test@test.com");
        //submit / login
        await emailField.sendKeys(Key.ENTER);

        //verify we got to the homepage
        let email = await driver.wait(until.elementLocated(By.className("css-1sykydy")), 10000);
        let emailText = await email.getText();
        assert.equal(emailText, "TEST@TEST.COM", "Able to login and reach the home page");

      } finally {
        await driver.quit();
      }
      
}, 30000); //timeout after 30seconds

  
});
