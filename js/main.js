const getLocation = () => {
    document.getElementById('weather-container').textContent='';
    const searchField = document.getElementById('search-field');
    const searchText =searchField.ariaValueMax;
    if(searchText == ''){
        alert('Enter the city name');
        return;
    }

    spinnerToggle('block');

    // API
    const locationApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=6894a6943ffac86b0dcf7a9083863dbe`;

    fetch(locationApiUrl)
      .then((response) => response.json())
      .then((dataset) => getWeather(dataset));
  };
// Weather getting function
const getWeather = (cities) => {
    cities.forEach((city) => {
      const cityName = city.name;
      const cityState = city.state;
      const cityInfo = { cityName, cityState };
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=6894a6943ffac86b0dcf7a9083863dbe`;
  
      // Fetching weather
      fetch(weatherApiUrl)
        .then((response) => response.json())
        .then((dataset) => displayWeather(dataset, cityInfo));
    });
  };

// Weather display function
const displayWeather = (weather, cityInfo) => {
    // Process and adding result
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const weatherContainer = document.getElementById('weather-container');
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="relative block p-8 overflow-hidden border border-gray-100 rounded-lg mt-10" href="">
          <span class="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
  
          <div class="justify-between items-center sm:flex sm:gap-8 md:gap-4">
              <div>
                  <h4 class="text-2xl font-bold text-gray-600">
                      ${cityInfo.cityName}
                  </h4>
                  <p class="mt-1 text-lg font-medium text-gray-600">
                  ${cityInfo.cityState}, 
                  <span class="text-xl text-gray-900">${
                    weather.sys.country
                  } </span>
                  </p>
              </div>
  
              <div>
                  <p class="mt-1 text-lg font-medium text-gray-600">
                      Today's <span class="text-xl"></span>
                  </p>
                  <p class="mt-1 text-lg font-medium text-gray-600">
                      Temperature <span class="text-xl text-gray-900">${kelToCell(
                        weather.main.temp_min
                      )}º</span> / <span class="text-xl text-gray-900">${kelToCell(
      weather.main.temp_max
    )}º</span>
                  </p>
              </div>
  
              <div>
                  <p class="mt-1 text-lg font-medium text-gray-600">
                      Currently <span class="text-xl text-gray-900">${kelToCell(
                        weather.main.temp
                      )}º</span>
                  </p>
                  <p class="mt-1 text-lg font-medium text-gray-600">
                      Feels like <span class="text-xl text-gray-900">${kelToCell(
                        weather.main.feels_like
                      )}º</span>
                  </p>
  
              </div>
  
              <div class="flex md:flex-col items-center">
                  <img class="object-cover w-16 h-16 rounded-lg shadow-sm" src="${weatherIconUrl}" />
                  <p class="mt-1 text-lg font-medium text-gray-600 text-center mt-2">${
                    weather.weather[0].main
                  }</p>
              </div>
  
          </div>
      </div>
      `;
    weatherContainer.appendChild(div);
    spinnerToggle('none');
    console.log(weather);
  };
// kelvin to celcius function
const kelToCell = (kelvin) => (kelvin - 273.15).toFixed(2);

// Spinner toggle funciton
const spinnerToggle = (displayProperty) =>
  (document.getElementById('spinner').style.display = displayProperty);