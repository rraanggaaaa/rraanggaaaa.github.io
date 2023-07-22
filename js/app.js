// WEATHER API
const apiKey = "c5f35647833f2b888d9f288bad158bc7";
const cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon");

function fetchWeatherData(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const weatherIconCode = data.weather[0].icon;

      cityElement.textContent = cityName;
      temperatureElement.textContent = `${temperature}°C`;
      descriptionElement.textContent = `${description}`;

      setWeatherIcon(weatherIconCode);
    })
    .catch((error) => console.log("Error fetching weather data:", error));
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.log("Error getting user location:", error);
        cityElement.textContent = "Location not available";
      }
    );
  } else {
    console.log("Geolocation is not available in this browser.");
    cityElement.textContent = "Geolocation not supported";
  }
}

function setWeatherIcon(iconCode) {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  weatherIconElement.src = iconUrl;
}

getLocation();

// VISITOR
// Function to check if local storage is supported in the browser
function isLocalStorageSupported() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}

// Function to get the current visitor count from local storage
function getVisitorCount() {
  if (isLocalStorageSupported()) {
    const count = localStorage.getItem("visitorCount");
    return count ? parseInt(count) : 0;
  } else {
    return 0;
  }
}

// Function to update and display the visitor count
function updateVisitorCount() {
  const count = getVisitorCount() + 1;
  if (isLocalStorageSupported()) {
    localStorage.setItem("visitorCount", count);
  }
  const visitorCountElement = document.getElementById("visitorCount");
  visitorCountElement.textContent = count;
}

// Call the function to update and display the visitor count
updateVisitorCount();

// LISTEN BUTTON
const listenButton = document.getElementById("listenButton");

listenButton.addEventListener("click", () => {
  window.location.href =
    "https://open.spotify.com/playlist/6jcGfqd0t2qxX5R9iDxruP?si=9c123c3b77ae4401";
});

// CARD PHOTO
const cardContainer = document.querySelector(".card-container");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentIndex = 0;

function showSlide(index) {
  const translateXValue = `translateX(-${index * 350}px)`; // 350px is the width of each card
  cardContainer.style.transform = translateXValue;
  currentIndex = index;
}

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    showSlide(currentIndex - 1);
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < cardContainer.childElementCount - 1) {
    showSlide(currentIndex + 1);
  }
});
