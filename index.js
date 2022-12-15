
const res = require("express/lib/response");
const https = require("https");
const express = require ("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function (req, res){
res.sendFile(__dirname + "/index.html");
});
app.post("/" , function(req,res) {
  
   const query = req.body.cityName;
   const apikey = "f6bf189aba4c2fd066abcdf08277a8d5";
   const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit ;
   https.get(url, function(response){
       console.log(response.statusCode);
       response.on("data", function(data){
       const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const description = weatherData.weather[0].description;
      const imageUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1> The temperature in ${query} is ${temp}.</h1>`);
      res.write(`<p>The weather is currently ${description}.</p>`);
      res.write("<img src = " + imageUrl + ">");
      res.send();

       })
   })
});












app.listen(3000, function(){
    console.log("server is running on port 30000");
})