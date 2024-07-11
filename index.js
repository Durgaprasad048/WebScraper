const  PORT = 8000;
const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const cors = require('cors')

const app = express()
 
app.use(cors())


const url="https://www.ndtv.com/topic/times-now-india"


app.get("/", function (req ,res) {
    res.json("This is My Webscraper")
})

app.get("/result", (req,res)=>{
    axios(url)
     .then(response =>{
        const html = response.data
        const $ = cheerio.load(html)
        const article = []
        $('.src_lst-li',html).each(function(){
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            article.push({
                title,
                url
            })
        })
        
        res.json(article)
    })
    .catch(err => console.log(err))
})

axios(url)
     .then(response =>{
        const html = response.data
        const $ = cheerio.load(html)
        const article = []
        $('.src_lst-li',html).each(function(){
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            article.push({
                title,
                url
            })
        })
        
        console.log(article)
    })
    .catch(err => console.log(err))

app.listen(PORT ,() => console.log(`Server is running on the port ${PORT}`))




