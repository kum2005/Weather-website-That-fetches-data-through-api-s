const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const background = document.querySelector('.background');
const seasons = document.querySelector('.seasons');
const weatherDataElement = document.querySelector('.weather-data');

// API keys
const OPENWEATHERMAP_API_KEY = 'YOUR_API_KEY_HERE';
const UNSPLASH_API_KEY = 'YOUR_API_KEY_HERE';

// Function to get weather data
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to retrieve weather data. Please try again later.');
    }
}

// Function to get background image
async function getBackgroundImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${UNSPLASH_API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch background image');
        }
        const data = await response.json();
        return data.urls.full;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to retrieve background image. Please try again later.');
    }
}

// Function to display weather data
function displayWeatherData(data) {
    const temperatureCelsius = (data.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
    const weatherHTML = `
        <div>
            <h2>${data.name}</h2>
            <p>Temperature: ${temperatureCelsius}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
    weatherDataElement.innerHTML = weatherHTML;
}

// Function to display seasons
function displaySeasons() {
    const seasonsHTML = `
        <div>Spring</div>
        <div>Summer</div>
        <div>Autumn</div>
        <div>Winter</div>
    `;
    seasons.innerHTML = seasonsHTML;
}

// Event listener for search button
searchBtn.addEventListener('click', async () => {
    const city = searchInput.value;
    const weatherData = await getWeatherData(city);
    if (weatherData) {
        displayWeatherData(weatherData);
    }
    const backgroundImage = await getBackgroundImage();
    if (backgroundImage) {
        background.style.backgroundImage = `url(${backgroundImage})`;
    }
});
// Get the div sections for each season
const rainySeason = document.getElementById('rainy');
const winterSeason = document.getElementById('winter');
const summerSeason = document.getElementById('summer');

// Set the image sources for each season
rainySeason.querySelector('img').src = 'rain4.jpg';
winterSeason.querySelector('img').src = 'winter2.jpg';
summerSeason.querySelector('img').src = 'summer3.jpg';