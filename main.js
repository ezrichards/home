const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
const electron = require('electron');
const express = require('express');
const expressApp = express();
const axios = require('axios');
require('dotenv').config()

const createWindow = () => {
  var screenElectron = electron.screen;
  var mainScreen = screenElectron.getPrimaryDisplay();
  var dimensions = mainScreen.size;

  const mainWindow = new BrowserWindow({
    width: dimensions.width, 
    height: dimensions.height, 
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  // https://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser?noredirect=1&lq=1
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if(url.startsWith('https:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

expressApp.post('/settings', async(req, res) => { 
  res.send({ "name": process.env.NAME });
})

expressApp.post('/weather', async(req, res) => { 
  let payload = {};
  
  // User settings will be in environment file for now..store in DB later
  await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + process.env.LOCATION + '&units=imperial&appid=' + process.env.WEATHER_API_KEY)
  .then(function(response) {
    payload = {
      "temperature": response.data.main.temp,
      "min_temp": response.data.main.temp_min,
      "max_temp": response.data.main.temp_max,
      "feels_like": response.data.main.feels_like,
      "weather": response.data.weather[0].main,
      "location": process.env.LOCATION
    };
  })
  .catch(function(error) {
    console.log(error);
  });
  res.send(payload);
})

expressApp.post('/news', async(req, res) => {
  let payload = {};

  // User settings will be in environment file for now..store in DB later
  await axios.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY)
  .then(function(response) {
    payload = {
      "headline1": response.data.articles[0].title,
      "headline1url": response.data.articles[0].url,
      "headline2": response.data.articles[1].title,
      "headline2url": response.data.articles[1].url,
    };
  })
  .catch(function(error) {
    console.log(error);
  });
  res.send(payload);
})

expressApp.listen(8888, () => {
  console.log('Backend server running on port 8888.')
})
