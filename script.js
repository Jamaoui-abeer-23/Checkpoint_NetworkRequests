// Select DOM elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

// Add event listener to the form
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
        const apiKey = '7e026fb9bbb958333452d4f4434507ad';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        // Fetch weather data
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found or invalid API key.');
        }

        const data = await response.json();

        // Extract relevant data
        const { name } = data;
        const { temp, humidity } = data.main;
        const { description, icon } = data.weather[0];

        // Display weather information
        weatherResult.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    }

    // Clear the input field
    cityInput.value = '';
});