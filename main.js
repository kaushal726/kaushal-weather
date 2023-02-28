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
let city, cityname, descvar, tempvar, windvar, visibilityvar, datevar, sunrisevar, sunsetvar, humidityvar, pressurevar, feelslikevar;

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
        city = "Ranchi";
    textValue.value = "";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e94590180a6e60e6c262defb6d414ad`)
        .then(res => res.json())
        .then(data => {
            cityname = data.name;
            descvar = data.weather[0].description;
            tempvar = data.main.temp;
            windvar = data['wind']['speed'];
            visibilityvar = data['visibility'];
            datevar = data['dt'];
            sunrisevar = data['sys']['sunrise'];
            sunsetvar = data['sys']['sunset'];
            pressurevar = data['main']['pressure'];
            humidityvar = data['main']['humidity'];
            feelslikevar = data['main']['feels_like'];
            cityoutput.innerHTML = `Weather of ${cityname}`;
            description.innerHTML = `${descvar.toUpperCase()}`;
            temp.innerHTML = ` ${tempConverter(tempvar)}°C`;
            wind.innerHTML = `Wind :  ${windvar} mph`;
            sunrise.innerHTML = `Sunrise :  ${unixToTimeConverter(sunrisevar, "sunrise")} am`;
            sunset.innerHTML = `Sunset : ${unixToTimeConverter(sunsetvar, "sunset")} pm`;
            textValue.value = "";
        })
        .catch(err => {
            console.log(err);
        })
}
showApi();

let showWeatherOfCity = (cityName, temp, desc, feelslike, wind, sunrise, sunset) => {
    let cityDetail = {
        temperature: null,
        description: null,
        feelslike: null,
        wind: null,
        sunrise: null,
        sunset: null,
    };

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0e94590180a6e60e6c262defb6d414ad`)
        .then(res => res.json())
        .then(data => {
            cityDetail.description = data.weather[0].description;
            cityDetail.temperature = data.main.temp;
            cityDetail.wind = data['wind']['speed'];
            cityDetail.sunrise = data['sys']['sunrise'];
            cityDetail.sunset = data['sys']['sunset'];
            cityDetail.feelslike = data['main']['feels_like'];
            temp.innerHTML = ` ${tempConverter(cityDetail.temperature)}°C`;
            desc.innerHTML = `${cityDetail.description.toUpperCase()}`;
            wind.innerHTML = `${cityDetail.wind} mph`;
            feelslike.innerHTML = ` ${tempConverter(cityDetail.feelslike)}°C`;
            sunrise.innerHTML = ` ${unixToTimeConverter(cityDetail.sunrise, "sunrise")} am`;
            sunset.innerHTML = ` ${unixToTimeConverter(cityDetail.sunset, "sunset")} pm`;
        })
}
showWeatherOfCity("gurgaon", gurgaontemp, gurgaondesc, gurgaonfeelike, gurgaonwind, gurgaonsunrise, gurgaonsunset);
showWeatherOfCity("mumbai", mumbaitemp, mumbaidesc, mumbailike, mumbaiwind, mumbaisunrise, mumbaisunset);
showWeatherOfCity("gaya", gayatemp, gayadesc, gayafeelike, gayawind, gayasunrise, gayasunset);