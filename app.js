const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
let fs = require("fs");

app.use(express.static("public"));

app.set("view engine","ejs")

app.get("/", function(req,res){
    res.render("app.ejs")
})

app.listen(3000,function(){
    (async () =>{
        let url = "https://masjidenoor.com/"
        let browser = await puppeteer.launch()
        const page = await browser.newPage();
    
        await page.goto(url)
        
        let data = await page.evaluate(() =>{
            let fajr = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(7) > td:nth-child(3)").innerText
            let zuhr = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(9) > td:nth-child(3)").innerText
            let asr = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(11) > td:nth-child(3)").innerText
            let maghrib = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(13) > td:nth-child(3)").innerText
            let esha = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(15) > td:nth-child(3)").innerText
    
            return {
                fajr,zuhr,asr,maghrib,esha,
            }
        })
        jsonData = JSON.stringify(data);
        fs.writeFile("public/masjidnoor.json", jsonData, function(err){
            if (err){
                console.log(err)
            }
        })    
        await browser.close()
    })(),
    
    (async () =>{
        let url = "http://portsmouthjamimosque.co.uk/"
        let browser = await puppeteer.launch()
        const page = await browser.newPage();
    
        await page.goto(url)
        
        let data = await page.evaluate(() =>{
            let fajr = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(5) > div:nth-child(3)").innerText
            let zuhr = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(6) > div:nth-child(3)").innerText
            let asr = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(7) > div:nth-child(3)").innerText
            let maghrib = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(8) > div:nth-child(2)").innerText
            let esha = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(9) > div:nth-child(3)").innerText
    
            return {
                fajr,zuhr,asr,maghrib,esha,
            }
        })
        jsonData = JSON.stringify(data);
        fs.writeFile("public/jamimosque.json", jsonData, function(err){
            if (err){
                console.log(err)
            }
        })    
        await browser.close()
    })()
    
    
    
})