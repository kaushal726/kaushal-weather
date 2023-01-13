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
let maxtemp = document.querySelector("#maxtemp");
let mintemp = document.querySelector("#mintemp");
let feelslike = document.querySelector("#feelslike");
let cityname, descvar, tempvar, windvar, visibilityvar, datevar, sunrisevar, sunsetvar, humidityvar, pressurevar, maxtempvar, mintempvar, feelslikevar;
let city;

submitBtn.addEventListener("click", () => {
    city = textValue.value;
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3045dd712ffe6e702e3245525ac7fa38`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            cityname = data['name'];
            descvar = data['weather']['0']['description'];
            tempvar = data['main']['temp']  
            windvar = data['wind']['speed']
            visibilityvar = data['visibility']
            datevar = data['dt']
            sunrise = data['sys']['sunrise']
            sunset = data['sys']['sunset']
            pressurevar = data['main']['pressure']
            maxtempvar = data['main']['temp_max']
            mintemp = data['main']['temp_min']
            feelslikevar = data['main']['feels_like']

        })
})


