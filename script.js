const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'ca4af1689bc530466f3063d2dc9052b4'; // Updated API key

$(document).ready(function () {
    weatherFn('Pune');
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
            await fetchHistoricalWeather(data.coord.lat, data.coord.lon);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#humidity').html(`Humidity: ${data.main.humidity}%`);
    $('#dew-point').html(`Dew Point: ${calculateDewPoint(data.main.temp, data.main.humidity)}°C`);
    $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    $('#weather-info').fadeIn();
}

function calculateDewPoint(temp, humidity) {
    // Dew Point calculation formula
    return (temp - ((100 - humidity) / 5)).toFixed(1);
}

async function fetchHistoricalWeather(lat, lon) {
    const now = Math.floor(Date.now() / 1000);
    const day1 = now - 24 * 60 * 60; // 1 day ago
    const day2 = now - 2 * 24 * 60 * 60; // 2 days ago
    
    const urls = [
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${day1}&appid=${apiKey}&units=metric`,
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${day2}&appid=${apiKey}&units=metric`
    ];
    
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        
        if (responses.every(res => res.ok)) {
            const [dataDay1, dataDay2] = data;
            displayHistoricalWeather(dataDay1, dataDay2);
        } else {
            console.error('Error fetching historical weather data.');
        }
    } catch (error) {
        console.error('Error fetching historical weather data:', error);
    }
}

function displayHistoricalWeather(dataDay1, dataDay2) {


    const formatWeatherData = (data, day) => {
        return `<strong>${day}:</strong> ${data.current.temp}°C, ${data.current.weather[0].description};
    }`;
    
    $('#historical-weather').html(`
        <p>${formatWeatherData(dataDay1, '1 day ago')}</p>
        <p>${formatWeatherData(dataDay2, '2 days ago')}</p>
    `);
    }
}