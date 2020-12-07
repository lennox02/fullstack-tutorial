import { cleanup } from '../../test-utils';

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");
const sleep = require("sleep");

const appURL = "http://localhost:3000";
const testEmail = "Test@test.com";


describe('Navigating with Icons', () => {

  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('Can reach home page after logging in', async () => {
   //define webdriver
   let driver = new Builder().forBrowser('firefox').build();
   driver.get(appURL);
   //Get the email field, 
   let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
   //Send keys to the input
   await emailField.sendKeys(testEmail);
   //submit / login
   await emailField.sendKeys(Key.ENTER);


    //verify we got to the homepage
    let email = await driver.wait(until.elementLocated(By.className("css-1sykydy")), 10000);
    let emailText = await email.getText();
    assert.equal(emailText, "TEST@TEST.COM", "Able to login and reach the home page");
        
  }, 30000); //timeout after 30seconds

  it('Can reach the cart page via Icon', async () => {
    //define webdriver
    let driver = new Builder().forBrowser('firefox').build();
    driver.get(appURL);
    //Get the email field, 
    let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
    //Send keys to the input
    await emailField.sendKeys(testEmail);
    //submit / login
    await emailField.sendKeys(Key.ENTER);

    try{
      //grab the cart icon
      let cartIcon = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[2]')), 10000);
      //simulate a click
      await cartIcon.click();
      // sleep.sleep(3);
      //grab the new url
      let url = await driver.getCurrentUrl();
      //verify it is the cart page.
      assert.equal(url, appURL + "/cart", "Able to reach the cart via icon");
    }finally{
        await driver.quit();
    }
  
        
  }, 30000); //timeout after 30seconds

  it('Can reach the profile page via Icon', async () => {
     //define webdriver
     let driver = new Builder().forBrowser('firefox').build();
     driver.get(appURL);
     //Get the email field, 
     let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
     //Send keys to the input
     await emailField.sendKeys(testEmail);
     //submit / login
     await emailField.sendKeys(Key.ENTER);

    try{
      //grab the cart icon
      let profileIcon = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[3]')), 10000);
      //simulate a click
      await profileIcon.click();
      // sleep.sleep(3);
      //grab the new url
      let url = await driver.getCurrentUrl();
      //verify it is the cart page.
      assert.equal(url, appURL + "/profile", "Able to reach the profile page via icon");
    }finally{
        await driver.quit();
    }
  
        
  }, 30000); //timeout after 30seconds
  
  it('Can logout via icon', async () => {
     //define webdriver
     let driver = new Builder().forBrowser('firefox').build();
     driver.get(appURL);
     //Get the email field, 
     let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
     //Send keys to the input
     await emailField.sendKeys(testEmail);
     //submit / login
     await emailField.sendKeys(Key.ENTER);

    try{
      //grab the cart icon
      let logoutIcon = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/footer/div/button[1]')), 10000);
      //simulate a click
      await logoutIcon.click();
      sleep.sleep(2);
      //grab the new url
      let url = await driver.getCurrentUrl();
      //verify it is the cart page.
      assert.equal(url, appURL + "/",  "Able to logout");
    }finally{
        await driver.quit();
    }
  
        
  }, 30000); //timeout after 30seconds

  it('Can go back to home after being on another link via icon', async () => {
     //define webdriver
     let driver = new Builder().forBrowser('firefox').build();
     driver.get(appURL);
     //Get the email field, 
     let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
     //Send keys to the input
     await emailField.sendKeys(testEmail);
     //submit / login
     await emailField.sendKeys(Key.ENTER);

    try{
       //grab the cart icon
       let cartIcon = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[2]')), 10000);
       //simulate a click
       await cartIcon.click();
       //grab the new url
       let url = await driver.getCurrentUrl();
       //verify it is the cart page.
       assert.equal(url, appURL + "/cart", "Able to reach the cart via icon");

       //now navigate back to the home page
       let homeIcon = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[1]')), 10000);
       //simulate a click
       await homeIcon.click();
       //grab the new url
        url = await driver.getCurrentUrl();
       //verify it is the cart page.
       assert.equal(url, appURL + "/", "Able to reach the home page via icon");
    }finally{
        await driver.quit();
    }
  
        
  }, 30000); //timeout after 30seconds
  
});
