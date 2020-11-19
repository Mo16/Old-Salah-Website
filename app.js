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
    })(),

    (async () =>{
        let url = "https://masjidehidayah.org.uk/"
        let browser = await puppeteer.launch()
        const page = await browser.newPage();
    
        await page.goto(url)
        
        let data = await page.evaluate(() =>{
            let fajr = document.querySelector("#schedule-today > table > tbody > tr:nth-child(2) > td:nth-child(3)").innerText
            let zuhr = document.querySelector("#schedule-today > table > tbody > tr:nth-child(4) > td:nth-child(3)").innerText
            let asr = document.querySelector("#schedule-today > table > tbody > tr:nth-child(5) > td:nth-child(3)").innerText
            let maghrib = document.querySelector("#schedule-today > table > tbody > tr:nth-child(6) > td:nth-child(3)").innerText
            let esha = document.querySelector("#schedule-today > table > tbody > tr:nth-child(7) > td:nth-child(3)").innerText
    
            return {
                fajr,zuhr,asr,maghrib,esha,
            }
        })
        jsonData = JSON.stringify(data);
        fs.writeFile("public/masjidhidaya.json", jsonData, function(err){
            if (err){
                console.log(err)
            }
        })    
        await browser.close()
    })(),

    (async () =>{
        let url = "https://didsburymosque.com/"
        let browser = await puppeteer.launch()
        const page = await browser.newPage();
    
        await page.goto(url)
        
        let data = await page.evaluate(() =>{
            let fajr = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(3) > td.jamah").innerHTML
            let zuhr = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(5) > td.jamah").innerHTML
            let asr = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(6) > td.jamah").innerHTML
            let maghrib = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(7) > td.jamah.highlight").innerHTML
            let esha = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(8) > td.jamah").innerHTML
            return {
                fajr,zuhr,asr,maghrib,esha,
            }
        })
        jsonData = JSON.stringify(data);
        fs.writeFile("public/didsburymosque.json", jsonData, function(err){
            if (err){
                console.log(err)
            }
        })    
        await browser.close()
    })()
    
    
    

    
    
})