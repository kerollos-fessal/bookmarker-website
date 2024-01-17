const searchInput = document.querySelector("#search");
const findButton = document.querySelector("#find");
const today = document.querySelector("#currentDay");
const tomorrow = document.querySelector("#nextDay");
const afterTomorrow = document.querySelector("#lastDay");

findButton.addEventListener("click", function () {
  fetchUserData(searchInput.value);
});

searchInput.addEventListener("input", function () {
  fetchUserData(searchInput.value);
});

searchInput.addEventListener("change", function () {
    if(fetchUserData(searchInput.value)){
        alert("No Country With Thia Name!");
    };
  });

function fetchUserData(country) {
  const xhr = new XMLHttpRequest();
  let forecast = [];
  xhr.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=92d602b32f1a4b2f99c233513241601&q=${country}&days=3`
  );
  xhr.send();
  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      forecast = JSON.parse(xhr.response);
      console.log(forecast.forecast.forecastday[2].day.maxtemp_c);
      const dateStr = forecast.current.last_updated;
      const dateObject = new Date(dateStr);

      const currentDate = new Date();
      const tomorrowDate = new Date(currentDate);
      tomorrowDate.setDate(currentDate.getDate() + 1);
      const tomorrowDay = tomorrowDate.toLocaleDateString("en-US", {weekday: "long",});

      const afterTomorrowDate =  tomorrowDate.setDate(currentDate.getDate() + 2);
      const afterTomorrowDay = new Date(afterTomorrowDate).toLocaleDateString("en-US", {weekday: "long",});
      
      today.innerHTML = `<div class="card border-0 text-white mb-3">
                <div class="card-header py-2 custom-card-header">
                  <div class="d-flex text-secondary-subtle justify-content-between align-items-center align-content-center">
                    <p class="mb-0 grey-words">${dateObject.toLocaleDateString(
                      "en-US",
                      { weekday: "long" }
                    )}</p>
                    <p class="mb-0 grey-words">${dateObject.toLocaleDateString(
                      "en-US",
                      { day: "numeric", month: "long" }
                    )}</p>
                  </div>
                </div>
                <div class="card-body pb-4 custom-card-body">
                  <h5 class="card-title pt-4 grey-words">${
                    forecast.location.name
                  }</h5>
                  <div class="d-flex justify-content-around align-items-md-start flex-wrap">
                  <p class="card-text fw-bold mb-lg-5 degree-size ">${
                    forecast.current.temp_c
                  }<sub>o</sub>C</p>
                  <p class="fs-1"><img src="${
                    forecast.current.condition.icon
                  }" alt="condition"></p>
                </div>
                <p class="cloudy">${forecast.current.condition.text}</p>
                <div class="d-flex flex-wrap">
                  <div class="me-4">
                    <i class="fa-solid fa-umbrella grey-words me-1 fs-5"></i>
                    <span class="grey-words">${
                      forecast.current.humidity
                    }%</span>
                  </div>
                  <div class="me-4">
                    <i class="fa-solid fa-wind grey-words me-1 fs-5"></i>
                    <span class="grey-words">${
                      forecast.current.wind_kph
                    }km/h</span>
                  </div>
                  <div class="me-4">
                    <i class="fa-regular fa-compass grey-words me-1 fs-5"></i>
                    <span class="grey-words">${
                      forecast.current.wind_dir == "W"
                        ? "West"
                        : forecast.current.wind_dir == "E"
                        ? "East"
                        : forecast.current.wind_dir == "N"
                        ? "Nourth"
                        : "South"
                    }</span>
                  </div>
                </div>
                </div>
              </div>`;

      tomorrow.innerHTML = `<div class="card border-0 text-white mb-3">
              <div class="card-header py-2 rounded-0 custom-card-header-mid">
                <div class="d-flex text-secondary-subtle justify-content-center align-items-center align-content-center">
                  <p class="mb-0 grey-words">${tomorrowDay}</p>
                </div>
              </div>
              <div class="card-body custom-card-body-mid d-flex justify-content-center align-items-center flex-column py-4">
                <p class="card-title pt-4 my-4 grey-words"><img class="refactoring" src="${forecast.forecast.forecastday[1].day.condition.icon}" alt="condition"></p>
                <p class="fs-4 mb-0 adj-space">${forecast.forecast.forecastday[1].day.maxtemp_c}<sub>o</sub>C</p>
              <sm class="grey-words mb-4">${forecast.forecast.forecastday[1].day.mintemp_c}<sub>o</sub></sm>
              <p class="cloudy mb-md-5">${forecast.forecast.forecastday[1].day.condition.text}</p>
              </div>
            </div>`;

      afterTomorrow.innerHTML = `<div class="card border-0 text-white mb-3 ">
            <div class="card-header py-2  custom-card-header">
              <div class="d-flex text-secondary-subtle justify-content-center align-items-center align-content-center">
                <p class="mb-0 grey-words">${afterTomorrowDay}</p>
              </div>
            </div>
            <div class="card-body custom-card-body-last d-flex flex-column justify-content-center align-items-center py-4">
              <p class="card-title pt-4 my-4 grey-words"><img class="refactoring" src="${forecast.forecast.forecastday[2].day.condition.icon}" alt="condition"></p>
              <p class="fs-4 mb-0 adj-space">${forecast.forecast.forecastday[2].day.maxtemp_c}<sub>o</sub>C</p>
            <sm class="grey-words mb-4">${forecast.forecast.forecastday[2].day.mintemp_c}<sub>o</sub></sm>
            <p class="cloudy mb-md-5">${forecast.forecast.forecastday[2].day.condition.text}</p>
            </div>
          </div>`;
    } else {
      console.log("Error fetching country data:", xhr.statusText);
      console.log(this.readyState);
    }
  });
}
