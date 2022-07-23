const express = require('express')

const {spawn} = require('child_process')

const app = express()

app.set('view engine', 'hbs')

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res) => {

res.render('main',{title:'Youtube Video Url Tag Finder'})

})

app.post('/',(req,res) => {

var url = req.body.url

 console.log(url)

 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python3', ['script.py',url]);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.render('youtubetagfinder',{title:'FREE Youtube Video Tag Finder Extractor and Generator Online Tool - Extract Youtube Video Tags From Video URL Online - FreeMediaTools.com',tags:dataToSend})
 });

})

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
