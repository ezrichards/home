# home
A desktop home landing page application. 

## What is this?

I thought it would be interesting to make a desktop application using
[ElectronJS](https://www.electronjs.org) which provides a lot of information
in one spot, so I made this "landing page" application.

## Layout
The layout of this application is "squares" which all have useful information. 
I put some news and weather API data in there, but this system should be easily adapable 
to add more data of choice.

## .env file
The .env file should contain the following values:

`PORT`: The port the web application should run on (default 8888).
`WEATHER_API_KEY`: The API key to (OpenWeatherMap)[https://openweathermap.org] for weather integration.
`NEWS_API_KEY`: The API key to (NewsAPI)[https://newsapi.org] for news integration.
`LOCATION`: The location to use in weather queries.
`NAME`: The name to display on the home page.
