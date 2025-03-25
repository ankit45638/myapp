const apiKey = '789d06653744223f65ad1dd04942915d';

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

const getCurrentWeather = async(city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`; // Added country code for Agra (IN)

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayCurrentWeather(data);
            get5DayForecast(data.coord.lat, data.coord.lon);
        } else {
            alert('City not found!');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('There was an error fetching the weather data. Please try again.');
    }
};



const displayCurrentWeather = (data) => {
    currentWeatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
};


const get5DayForecast = async(lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '200') {
            display5DayForecast(data.list);
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
};


const display5DayForecast = (forecast) => {
    forecastContainer.innerHTML = '<h3>5-Day Forecast</h3>';


    forecast.slice(0, 5).forEach((day) => {
        const date = new Date(day.dt * 1000);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = day.main.temp;
        const description = day.weather[0].description;

        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <h4>${dayOfWeek}</h4>
                <p>${temp}°C</p>
                <p>${description}</p>
            </div>
        `;
    });
};


searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getCurrentWeather(city);
    } else {
        alert('Please enter a city name');
    }
});


cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});