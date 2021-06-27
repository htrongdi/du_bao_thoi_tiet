let API_ID = "be366e3d83e3d26daf09e5161120e98a";
const DEFAULT_VALUE = "--";
let searchInput = document.querySelector("#search-input");
let searchCity = document.querySelector(".search-icon");
let timeZone = document.querySelector(".time-zone");
let cityName = document.querySelector(".city-name");
let weatherState = document.querySelector(".weather-state");
let weatherIcon = document.querySelector(".weather-icon");
let temperature = document.querySelector(".temperature");
let temperatureMax = document.querySelector(".temp-max");
let temperatureMin = document.querySelector(".temp-min");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind-speed");
let khuDau = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};

searchInput.addEventListener("change", (e) => {
  let keySearch = khuDau(e.target.value);
  console.log("sau khử dấu:", keySearch);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${keySearch}&appid=${API_ID}&units=metric&lang=vi`
  ).then(async (res) => {
    const data = await res.json();
    console.log("[SearchInput]", data);
    if (data.cod == 404) {
      cityName.innerHTML = "Không tìm thấy";
      timeZone.innerHTML = DEFAULT_VALUE;
      weatherState.innerHTML = DEFAULT_VALUE;
      temperature.innerHTML = DEFAULT_VALUE;
      temperatureMax.innerHTML = DEFAULT_VALUE;
      temperatureMin.innerHTML = DEFAULT_VALUE;
      sunrise.innerHTML = DEFAULT_VALUE;
      sunset.innerHTML = DEFAULT_VALUE;
      humidity.innerHTML = DEFAULT_VALUE;
      windSpeed.innerHTML = DEFAULT_VALUE;
      return;
    }
    {
      cityName.innerHTML = data.name;
      if (data.timezone > 0) {
        timeZone.innerHTML = "+" + data.timezone / 3600;
      } else {
        timeZone.innerHTML = data.timezone / 3600;
      }
      weatherState.innerHTML = data.weather[0].description;
      weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      temperature.innerHTML = Math.round(data.main.temp);
      temperatureMax.innerHTML = data.main.temp_max;
      temperatureMin.innerHTML = data.main.temp_min;
      sunrise.innerHTML = moment.unix(data.sys.sunrise).format("H:mm");
      sunset.innerHTML = moment.unix(data.sys.sunset).format("H:mm");
      humidity.innerHTML = data.main.humidity;
      windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2);
    }
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
let synth = window.speechSynthesis;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "vi-VI";
recognition.continuous = false;

const microphone = document.querySelector(".microphone");

const speak = (text) => {
  if (synth.speaking) {
    console.error("Đang nói rồi nè");
    return;
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.onend = () => {
    console.log("SpeechSynthesisUtterance.onend");
  };
  utter.onerror = (err) => {
    console.error("SpeechSynthesisUtterance.onerror", err);
  };
  synth.speak(utter);
};

const handleVoice = (text) => {
  console.log(text);

  const handleText = text.toLowerCase();
  if (handleText.includes("thời tiết tại")) {
    const location = handleText.split("tại")[1].trim();
    console.log(location);
    searchInput.value = location;
    const changEvent = new Event("change");
    searchInput.dispatchEvent(changEvent);
    return;
  }
  //   if (handleText.includes("chó hồ")) {
  //     let elem = document.querySelector(".container");
  //     elem.className += "ho";
  //     alert("Hồ yêu Nhung");
  //   }
  //   if (handleText.includes("đổi màu nền")) {
  //     const color = handleText.split("màu nền")[1].trim();
  //     const container = document.querySelector(".container");
  //     container.style.background = color;
  //   }
  if (handleText.includes("mấy giờ rồi")) {
    const textToSpeech = `${moment().hours()} giờ ${moment().minutes()} phút ${moment().seconds()} giây`;
    speak(textToSpeech);
    return;
  }
  speak("Try again");
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
