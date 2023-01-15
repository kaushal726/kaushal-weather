let textValue = document.querySelector("#cityinput");
let submitBtn = document.querySelector("#add");
let cityoutput = document.querySelector("#cityoutput");
let description = document.querySelector("#description");
let temp = document.querySelector("#temp");
let wind = document.querySelector("#wind");
let visibility = document.querySelector("#visibility");
let date = document.querySelector("#date");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let feelslike = document.querySelector("#feelslike");
let city, cityname, descvar, tempvar, windvar, visibilityvar, datevar, sunrisevar, sunsetvar, humidityvar, pressurevar, feelslikevar;

function tempConverter(kelvin) {
    return Math.round(kelvin - 273.15);
}
function unixToDateConverter(unixDate) {
    let date = new Date(unixDate * 1000);
    // let newDatw = date.substring(1, 10);
    console.log(date);
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

submitBtn.addEventListener("click", () => {
    city = textValue.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59467ea71641323dee7468c3b76b7ecc`)
        .then(res => res.json())
        .then(data => {
            cityname = data['name'];
            descvar = data['weather']['0']['description'];
            tempvar = data['main']['temp'];
            windvar = data['wind']['speed'];
            visibilityvar = data['visibility'];
            datevar = data['dt'];
            sunrisevar = data['sys']['sunrise'];
            sunsetvar = data['sys']['sunset'];
            pressurevar = data['main']['pressure'];
            humidityvar = data['main']['humidity'];
            feelslikevar = data['main']['feels_like'];
            cityoutput.innerHTML = `Weather of ${cityname}`;
            description.innerHTML = `Description :  ${descvar}`;
            temp.innerHTML = `Temperature : ${tempConverter(tempvar)} °C`;
            wind.innerHTML = `Wind :  ${windvar} mph`;
            date.innerHTML = `Date : ${unixToDateConverter(datevar)}`;
            sunrise.innerHTML = `Sunrise :  ${unixToTimeConverter(sunrisevar, "sunrise")} am`;
            sunset.innerHTML = `Sunset : ${unixToTimeConverter(sunsetvar, "sunset")} pm`;
            humidity.innerHTML = `Humidity : ${humidityvar} %`;
            pressure.innerHTML = `Pressure : ↑${pressurevar} mb`;
            feelslike.innerHTML = `Feelslike :  ${tempConverter(feelslikevar)} °C`;
            textValue.innerHTML = "";
        })

})


