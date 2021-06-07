const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
  const city = req.body.cityName;
  const api_key="";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+api_key;
  https.get(url,function(response){
    console.log(response);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = weatherData.main.temp;
      console.log(temp);

      const description = weatherData.weather[0].description;
      console.log(description);
      res.write("<h1>The temperature at "+city+" is "+temp+" and weather description is "+description+" </h1>");
      const icon = weatherData.weather[0].icon;
      const iconURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.write("<img src="+ iconURL +">")

     })
  });
})




app.listen(3000,function(){
  console.log("Server is up and running at port 3000")
});
