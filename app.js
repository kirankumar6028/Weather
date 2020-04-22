

const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

   const query = req.body.cityName;
   const apiKey = "439d4b804bc8187953eb36d2a8c26a02";
   const url = "https://samples.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "";

   https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const val = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = " http://openweathermap.org/img/wn/" +icon+ "@2x.png"
      res.write("<p>Weather discription " + val +"</p>");
      res.write("<h1>The Temperature in " +query+ " is " + (temp-273.3) + " degree celcius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })
});












app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
