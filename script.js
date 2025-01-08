document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'YOUR_API_KEY'; // Use your OpenWeatherMap API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          document.getElementById('city-name').textContent = data.name;
          document.getElementById('weather-description').textContent = data.weather[0].description;
          document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
          document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
          document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
  
          // DIVA's Disaster Alert based on weather data
          let disasterAlert = '';
          if (data.weather[0].main.toLowerCase() === 'rain' || data.weather[0].main.toLowerCase() === 'storm') {
            disasterAlert = '⚠️ DIVA Alert: A storm or heavy rainfall is expected. Ensure you have emergency supplies and stay indoors when possible.';
          } else if (data.wind.speed > 15) {
            disasterAlert = '⚠️ DIVA Alert: High winds detected. Secure loose objects and avoid outdoor activities.';
          } else {
            disasterAlert = '🌤️ DIVA: No immediate weather threats detected. Stay safe and prepared.';
          }
          
          document.getElementById('disaster-alert').textContent = disasterAlert;
  
        } else {
          alert('City not found. Please try again.');
        }
      })
      .catch(error => {
        alert('Error fetching weather data.');
      });
  });
  