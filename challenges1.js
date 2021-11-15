const puppy = require("puppeteer");

async function openBrowser(){
const browser = await puppy.launch({
    headless: false,
    defaultViewport: false,
    args:[
        '--start-maximized' // you can also use '--start-fullscreen'
    ],
    slowMo: 250,// slow the input speed in the input field 
});
// let tabs = await browser.pages();
// let currrentTab = tabs[0];
// await currrentTab.goto("https://www.google.com");
// }

// browser.pages().then(function(tabs){
//     tabs[0].goto("https://www.google.com");
// })

// for(let i=0; i<9;i++)
// {
//     browser.newPage().then(function(tab){
//         tab.goto("https://www.google.com");
//     })
// }
const tabs = await browser.pages();
const tab = tabs[0];
await tab.goto("https://www.hackerrank.com/auth/login");
let usernameInputTab = await tab.$("#input-1");
let passwordInputTab = await tab.$("#input-2");
let rememberCheckbox = await tab.$(".checkbox-input");
let loginButton = await tab.$('[data-analytics="LoginPassword"]');
await usernameInputTab.type("gshubham804@gmail.com");
await passwordInputTab.type("hello123");
await rememberCheckbox.click();
await loginButton.click();
}
openBrowser("https://www.google.com");