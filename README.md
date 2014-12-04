Surfs Up README
===============

Packages
========
meteor add http
meteor add mizzao:bootstrap-3  
meteor add natestrauser:font-awesome  
meteor add ficshelf:media-query 
meteor add-platform android
meteor add mdg:geolocation 

START UP TIPS
==============
export ANT_HOME=/home/steeve/.meteor/android_bundle/apache-ant-1.9.4
export JAVA_HOME='/usr/lib/jvm/java-7-openjdk-i386'


YOU MAY HAVE TO
=================
rm -rf $HOME/.meteor/android_bundle

Weather Data
============
http://www.worldweatheronline.com/free-weather-feed.aspx
Key: 80871687910145e5eede51eaa2885

api.worldweatheronline.com/free/v2/marine.ashx?q=lat,long&format=json&key=80871687910145e5eede51eaa2885

api.worldweatheronline.com/free/v2/marine.ashx?q=28,-82&format=json&key=80871687910145e5eede51eaa2885

weather element
{
  "cloudcover":"0",
  "humidity":"90",
  "precipMM":"0.0",
  "pressure":"1021",
  "sigHeight_m":"0.1",
  "swellDir":"70",
  "swellHeight_m":"0.6",
  "swellPeriod_secs":"4.1",
  "tempC":"17",
  "tempF":"63",
  "time":"0",
  "visibility":"10",
  "waterTemp_C":"20",
  "waterTemp_F":"68"
  ,"weatherCode":"113",
  "weatherIconUrl":[{"value":"http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}],
  "winddir16Point":"ENE",
  "winddirDegree":"59",
  "windspeedKmph":"21",
  "windspeedMiles":"13"
}

Maps
=====
https://developers.google.com/maps/documentation/staticmaps/