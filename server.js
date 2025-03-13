const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric', 
      },
    });

    const { temp, humidity, weather } = weatherData.data.main;
    res.json({
      temperature: temp,
      humidity : humidity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
