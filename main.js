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
let city, cityname, descvar, tempvar, windvar, visibilityvar, datevar, sunrisevar, sunsetvar, humidityvar, pressurevar, feelslikevar;


document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") submitBtn.click();
})



function tempConverter(kelvin) {
    return Math.round(kelvin - 273.15);
}
function unixToDateConverter(unixDate) {
    let date = new Date(unixDate * 1000);
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
function showval() {
    errorshow.innerHTML = `No result found,Try Again!`
    textValue.value = "";
    wrapper.style.display = "none";
    errorshow.style.display = "block";
}

function showApi() {
    console.log("sssssssss");
    city = textValue.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e94590180a6e60e6c262defb6d414ad`)
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
            wrapper.style.display = "block";
            errorshow.style.display = "none";
            textValue.value = "";
        })
        .catch(err => {
            showval();
            console.log(err);
        })

}



