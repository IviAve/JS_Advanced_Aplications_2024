
async function attachEvents() {
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', getWeather);

    async function getWeather() {
        const locationInput = document.getElementById('location');
        const location = locationInput.value.trim();

        // if (!location) {
        //     alert('Please enter a location');
        //     return;
        // }

        const forecastDiv = document.getElementById('forecast');
        const currentDiv = document.getElementById('current');
        const upcomingDiv = document.getElementById('upcoming');

        // Clear previous forecast
        currentDiv.innerHTML = '<div class="label">Current conditions</div>';
        upcomingDiv.innerHTML = '<div class="label">Three-day forecast</div>';

        try {
            const locationsResponse = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
            if (!locationsResponse.ok) {
                throw new Error('Failed to fetch locations');
            }
            const locationsData = await locationsResponse.json();

            const locationData = locationsData.find(loc => loc.name.toLowerCase() === location.toLowerCase());
            if (!locationData) {
                throw new Error('Location not found');
            }

            const todayResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationData.code}`);
            if (!todayResponse.ok) {
                throw new Error('Failed to fetch today\'s weather');
            }
            const todayData = await todayResponse.json();

            const upcomingResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationData.code}`);
            if (!upcomingResponse.ok) {
                throw new Error('Failed to fetch upcoming weather');
            }
            const upcomingData = await upcomingResponse.json();

            displayCurrentWeather(todayData);
            displayUpcomingWeather(upcomingData);

            forecastDiv.style.display = 'block';
        } catch (error) {
            console.error('Error fetching weather data:', error);
            resetForecastDisplay(forecastDiv);
        }
    }

    function resetForecastDisplay(forecastDiv) {
        forecastDiv.style.display = 'block';
        forecastDiv.innerHTML = '<div class="label">Error</div>';
    }

    function displayCurrentWeather(data) {
        const currentDiv = document.getElementById('current');
        const conditionSymbols = {
            'Sunny': '&#x2600;', // ☀
            'Partly sunny': '&#x26C5;', // ⛅
            'Overcast': '&#x2601;', // ☁
            'Rain': '&#x2614;' // ☂
        };

        const symbol = conditionSymbols[data.forecast.condition] || '';

        const forecastsDiv = document.createElement('div');
        forecastsDiv.classList.add('forecasts');
       

        const symbolSpan = document.createElement('span');
        symbolSpan.classList.add('symbol');
        symbolSpan.innerHTML = symbol;

        const locationSpan = document.createElement('span');
        locationSpan.classList.add('forecast-data');
        locationSpan.textContent = data.name;

        const tempSpan = document.createElement('span');
        tempSpan.classList.add('forecast-data');
        tempSpan.textContent = `${data.forecast.low}°/${data.forecast.high}°`;

        const conditionSpan = document.createElement('span');
        conditionSpan.classList.add('forecast-data');
        conditionSpan.textContent = data.forecast.condition;

        forecastsDiv.append(symbolSpan, locationSpan, tempSpan, conditionSpan);
        currentDiv.appendChild(forecastsDiv);
    }

    function displayUpcomingWeather(data) {
        const upcomingDiv = document.getElementById('upcoming');
        const conditionSymbols = {
            'Sunny': '&#x2600;', // ☀
            'Partly sunny': '&#x26C5;', // ⛅
            'Overcast': '&#x2601;', // ☁
            'Rain': '&#x2614;' // ☂
        };

        const forecastInfoDiv = document.createElement('div');
        forecastInfoDiv.classList.add('forecast-info');

        data.forecast.forEach(day => {
            const symbol = conditionSymbols[day.condition] || '';

            const upcomingSpan = document.createElement('span');
            upcomingSpan.classList.add('upcoming');

            const symbolSpan = document.createElement('span');
            symbolSpan.classList.add('symbol');
            symbolSpan.innerHTML = symbol;

            const tempSpan = document.createElement('span');
            tempSpan.classList.add('forecast-data');
            tempSpan.textContent = `${day.low}°/${day.high}°`;

            const conditionSpan = document.createElement('span');
            conditionSpan.classList.add('forecast-data');
            conditionSpan.textContent = day.condition;

            upcomingSpan.append(symbolSpan, tempSpan, conditionSpan);
            forecastInfoDiv.appendChild(upcomingSpan);
        });

        upcomingDiv.appendChild(forecastInfoDiv);
    }
}

attachEvents();