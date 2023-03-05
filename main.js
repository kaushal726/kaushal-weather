let textValue = document.querySelector("#cityinput");
let wrapper = document.querySelector(".wrapper");
let submitBtn = document.querySelector("#add");
let cityoutput = document.querySelector("#cityoutput");
let description = document.querySelector("#description");
let temp = document.querySelector("#temp");
let wind = document.querySelector("#wind");
let visibility = document.querySelector("#visibility");
let date = document.querySelector("#date");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let errorshow = document.querySelector('.Error')
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let feelslike = document.querySelector("#feelslike");
let gayatemp = document.querySelector("#gtemp");
let gayadesc = document.querySelector("#gdesc");
let gayafeelike = document.querySelector("#gfl");
let gayawind = document.querySelector("#gw");
let gayasunrise = document.querySelector("#gsr");
let gayasunset = document.querySelector("#gss");
let gurgaontemp = document.querySelector("#grtemp");
let gurgaondesc = document.querySelector("#grdesc");
let gurgaonfeelike = document.querySelector("#grfl");
let gurgaonwind = document.querySelector("#grw");
let gurgaonsunrise = document.querySelector("#grsr");
let gurgaonsunset = document.querySelector("#grss");
let mumbaitemp = document.querySelector("#mtemp");
let mumbaidesc = document.querySelector("#mdesc");
let mumbailike = document.querySelector("#mfl");
let mumbaiwind = document.querySelector("#mw");
let mumbaisunrise = document.querySelector("#msr");
let mumbaisunset = document.querySelector("#mss");

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") submitBtn.click();
})
function tempConverter(kelvin) {
    return Math.round(kelvin - 273.15);
}
function unixToDateConverter(unixDate) {
    let date = new Date(unixDate * 1000);
    return date;
}

function unixToTimeConverter(unixDate, which) {
    if (which != "sunset") {
        let date = new Date(unixDate * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formatTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return (formatTime);
    }
    else {
        let date = new Date(unixDate * 1000);
        let hours = date.getHours();
        hours = hours - 12;
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formatTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return (formatTime);
    }
}
function showval() {
    errorshow.innerHTML = `No result found,Try Again!`
    textValue.value = "";
    wrapper.style.display = "none";
    errorshow.style.display = "block";
}

function showApi() {
    if (textValue.value != "")
        city = textValue.value
    else
        city = "Delhi";
    textValue.value = "";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e94590180a6e60e6c262defb6d414ad`)
        .then(res => res.json())
        .then(data => {
            cityoutput.innerHTML = `Weather of ${data.name}`;
            description.innerHTML = `${data.weather[0].description.toUpperCase()}`;
            temp.innerHTML = ` ${tempConverter(data.main.temp)}°C`;
            wind.innerHTML = `Wind :  ${data['wind']['speed']} mph`;
            sunrise.innerHTML = `Sunrise :  ${unixToTimeConverter(data['sys']['sunrise'], "sunrise")} am`;
            sunset.innerHTML = `Sunset : ${unixToTimeConverter(data['sys']['sunset'], "sunset")} pm`;
            textValue.value = "";
        })
        .catch(err => {
            console.log(err);
        })
}
showApi();

let showWeatherOfCity = (args) => {
    let [cityName, temp, desc, feelslike, wind, sunrise, sunset] = args;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0e94590180a6e60e6c262defb6d414ad`)
        .then(res => res.json())
        .then(data => {
            temp.innerHTML = ` ${tempConverter(data.main.temp)}°C`;
            desc.innerHTML = `${data.weather[0].description.toUpperCase()}`;
            wind.innerHTML = `${data['wind']['speed']} mph`;
            feelslike.innerHTML = ` ${tempConverter(data['main']['feels_like'])}°C`;
            sunrise.innerHTML = ` ${unixToTimeConverter(data['sys']['sunrise'], "sunrise")} am`;
            sunset.innerHTML = ` ${unixToTimeConverter(data['sys']['sunset'], "sunset")} pm`;
        })
}
showWeatherOfCity(["gurgaon", gurgaontemp, gurgaondesc, gurgaonfeelike, gurgaonwind, gurgaonsunrise, gurgaonsunset]);
showWeatherOfCity(["mumbai", mumbaitemp, mumbaidesc, mumbailike, mumbaiwind, mumbaisunrise, mumbaisunset]);
showWeatherOfCity(["gaya", gayatemp, gayadesc, gayafeelike, gayawind, gayasunrise, gayasunset]);


let successCallback = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ff65fd7da036d1e69fa3a5025c2e46d1`)
        .then(res => res.json())
        .then(data => {
            cityoutput.innerHTML = `Weather of ${data.name}`;
            description.innerHTML = `${data.weather[0].description.toUpperCase()}`;
            temp.innerHTML = ` ${tempConverter(data.main.temp)}°C`;
            wind.innerHTML = `Wind :  ${data.wind.speed} mph`;
            sunrise.innerHTML = `Sunrise :  ${unixToTimeConverter(data.sys.sunrise, "sunrise")} am`;
            sunset.innerHTML = `Sunset : ${unixToTimeConverter(data.sys.sunset, "sunset")} pm`;
        })
}
navigator.geolocation.getCurrentPosition(successCallback);