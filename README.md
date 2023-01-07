# WeatherApp
A real-time updating weather website displaying data from the OpenWeatherMap API

Before loading the website, users are first met with a pre-loader which animates a chain of moving weather icons.

When loaded initially, the website displays weather information based on the current location of the user using geolocation. The current weather is displayed 
in the center while there being average data for each day in the upcoming week, at the bottom. In the top left of the website, time is displayed and is 
updated-live along with the date under it. In the top right of the website, the current city name is displayed in addition to the continent it is in.
To display the correct order of days at the bottom of the page, the moment.js library is used to convert unix time into real-time. 

Another feature of this website allows users to search up cities in the search bar at the top of the website. Either the search button or the enter key can be 
pressed to fetch a request to the API. Once requested, all of the information updates to present the weather and location of the requested city. 
