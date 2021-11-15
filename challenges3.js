const puppy = require("puppeteer");
const id = "gotitof472@tlhao86.com";
const password = "@Tempid123@";

let moderators = [
    "bansalbhavesh47",
    "bansalbhavesh50",
    "nocidi6371", 
    "ralariv999", 
    "yasekin473", 
    "sibaje3329", 
    "pamahex943"
];

let challenges = ["fgdfdfhfhdfh","fdhhdfhsdhsd","sdhdhfhsdh","sdhgsdhhddh","gagasgagsas"]
async function main() {
    let browser = await puppy.launch({
        headless: false,
        args:[
            '--start-maximized' // you can also use '--start-fullscreen'
        ],
        defaultViewport: false,
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",password);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.waitForSelector(".prep-kit-name", {visible: true});
    let startPreparationButton = await tab.$$(".prep-kit-name");
    await startPreparationButton[0].click();
    await tab.waitForSelector('[data-analytics="SolvePrepKitChallenge"]');
    let solveChallengeButtons = await tab.$$('[data-analytics="SolvePrepKitChallenge"]');
    let solveChallengeUrls = [];
    solveChallengeUrls.push(
        await tab.evaluate(function (ele) {
            return "https://www.hackerrank.com" + ele.getAttribute("href");
        },solveChallengeButtons[0])
    );
    solveChallengeUrls.push(
        await tab.evaluate(function (ele){
            return "https://www.hackerrank.com" + ele.getAttribute("href");
        },solveChallengeButtons[2])
    );

    for(let i=0; i<solveChallengeUrls.length;i++)
    {
        await solveChallenge(solveChallengeUrls[i],tab);
    }
     await browser.close();
}

async function solveChallenge(url,tab){
     let problemUrl = url.replace("?","/problem?");
     let editorialUrl = url.replace("?","/editorial?");
     await tab.goto(editorialUrl);
     let solutionsH3Tags = await tab.$$(".hackdown-content h3");
     let solutionLanguages = [];
     for(let solutionsH3Tag of solutionsH3Tags)
     {
         solutionLanguages.push(
             await tab.evaluate(function(ele)
             {
                 return ele.innerText;
             },solutionsH3Tag)
             );
     }
     let solutionPreTags = await tab.$$(".highlight pre");
     let solution;
     for(let i=0;i<solutionLanguages.length;i++)
     {
         if(solutionLanguages[i]=="C++")
         {
             solution =  await tab.evaluate(function (ele){
                 return ele.innerText;
             },solutionPreTags[i]);
             break;
         }
     }
     await tab.goto(problemUrl);
     await tab.waitForSelector(".view-lines");
     await tab.click('[type="checkbox"]');
     await tab.type('#input-1',solution);
     await tab.keyboard.down("Control");
     await tab.keyboard.press("A");
     await tab.keyboard.press("X");
     await tab.keyboard.up("Control");
     await tab.click(".view-lines");
     await tab.keyboard.down("Control");
     await tab.keyboard.press("A");
     await tab.keyboard.press("V");
     await tab.keyboard.up("Control");
     await tab.click(".hr-monaco-submit");
     await tab.waitForSelector(".congrats-wrapper");
}

main();