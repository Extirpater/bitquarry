const express = require('express')

const {spawn} = require('child_process')

const app = express()

app.set('view engine', 'hbs')

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res) => {
 res.render('main')
})


var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
