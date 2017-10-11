// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const request = require('reqeust')
const cheerio = require('cheerio')


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.addMessage = functions.https.onRequest((req, res) => {


    request.get('https://www.naver.com', (err, reponse, html) => {


        const $ = cheerio.load(html)

        let a = $('div.ah_list ul li')
        let result = ""

        a.each(function (i, e) {
            var rank = $(e).children('a').children('span.ah_r').text()
            var text = $(e).children('a').children('span.ah_k').text()

            result = result.concat("<br>"+rank + '위 : ' +text+"<br>")
        })
        res.send(result)
    })

});