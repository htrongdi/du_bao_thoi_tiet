let API_ID = "be366e3d83e3d26daf09e5161120e98a";
const DEFAULT_VALUE = "--";
let searchInput = document.querySelector("#search-input");
let searchCity = document.querySelector("search-icon");
let cityName = document.querySelector(".city-name");
let weatherState = document.querySelector(".weather-state");
let weatherIcon = document.querySelector(".weather-icon");
let temperature = document.querySelector(".temperature");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind-speed");

searchInput.addEventListener("change", (e) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_ID}&units=metric&lang=vi`
  ).then(async (res) => {
    const data = await res.json();
    console.log("[SearchInput]", data);
    cityName.innerHTML = data.name || "No Info";
    weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
    sunrise.innerHTML =
      moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT_VALUE;
    sunset.innerHTML =
      moment.unix(data.sys.sunset).format("H:mm") || DEFAULT_VALUE;
    humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
    windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
  });
  // console.log('[SearchInput]',e);
});

// searchCity.addEventListener("change", (e) => {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_ID}&units=metric&lang=vi`
//   ).then(async (res) => {
//     const data = await res.json();
//     console.log("[SearchInput]", data);
//     cityName.innerHTML = data.name || "No Info";
//     weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
//     weatherIcon.setAttribute(
//       "src",
//       `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
//     );
//     temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
//     sunrise.innerHTML =
//       moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT_VALUE;
//     sunset.innerHTML =
//       moment.unix(data.sys.sunset).format("H:mm") || DEFAULT_VALUE;
//     humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
//     windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
//   });
//   // console.log('[SearchInput]',e);
// });

//Tìm kiếm giọng nói
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "vi-VI";
recognition.continuous = false;

const microphone = document.querySelector(".microphone");
const handleVoice = (text) => {
  console.log(text);

  const handleText = text.toLowerCase();
  if (handleText.includes("thời tiết tại")) {
    const location = handleText.split("tại")[1].trim();
    console.log(location);
    searchInput.value = location;
    const changEvent = new Event("change");
    searchInput.dispatchEvent(changEvent);
  } else if (handleText.includes("chó hồ")) {
    let elem = document.querySelector(".container");
    elem.className += "ho";
    alert("Hồ yêu Nhung");
  }
};

microphone.addEventListener("click", (e) => {
  e.preventDefault();
  recognition.start();
  microphone.classList.add("recording");
});

recognition.onspeechend = () => {
  recognition.stop();
  microphone.classList.remove("recording");
};

recognition.onerror = (err) => {
  console.error(err);
  microphone.classList.remove("recording");
};

recognition.onresult = (e) => {
  console.log("onresult", e);
  const text = e.results[0][0].transcript;
  handleVoice(text);
};
