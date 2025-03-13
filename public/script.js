

document.getElementById('get-location-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        try {
          const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
          const data = await response.json();
  
          if (data.temperature) {
            document.getElementById('temperature').innerText = `Temperature: ${data.temperature}°C`;
            document.getElementById('humidity').innerText = `Humidity: ${data.humidity}%`;
  
            document.getElementById('weather-info').style.display = 'block';
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  });
  