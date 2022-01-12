let myKey = config.MY_KEY;

let country, city, description, icon_url, temp;
let API_URL_1, API_URL_5;

const fetchAllData = (position) => {
    API_URL_1 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${myKey}&units=metric`;
    API_URL_5 = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${myKey}&units=metric`;
    fetchCurrentWeather(API_URL_1)
    fetchForecast(API_URL_5)
}

// fetch current weather
const fetchCurrentWeather = async(url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        country = data.sys.country;
        city = data.name;
        description = data.weather[0].description;
        icon_url = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        temp = data.main.temp;
        showCurrent();
    } catch (error) {
        console.log(error)
    }
}

// fetch forecast weather
const fetchForecast = async(url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        showForecast(data);
    } catch (error) {
        console.log(error)
    }
}


showForecast = (data) => {
    for(let i = 0; i < 5; i++){
        let time = data.list[i].dt_txt.slice(11, 16);
        let imgUrl = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
        let temp = parseInt(data.list[i].main.temp) + "°C";
        let currImgWrap = document.getElementById("forecastWrap");
        let foreDiv = document.createElement("div");
        currImgWrap.appendChild(foreDiv);
        createDiv("f-time", time, foreDiv);
        createImageC(imgUrl, "forecastImg" + i, "f-img", foreDiv);
        createDiv("f-temp", temp, foreDiv);
        let clearDiv = document.createElement("div");
        clearDiv.setAttribute("class", "clear");
        foreDiv.appendChild(clearDiv);
        if(i < 4){
            let hrEl = document.createElement("hr");
            hrEl.setAttribute("class", "div-sep");
            currImgWrap.appendChild(hrEl);
        }
    }
}

showCurrent = () => {
    let cityBlock = document.getElementById("city");
    let tempBlock = document.getElementById("temp");
    let descriptionBlock = document.getElementById("description");
    let currImgWrap = document.getElementById("currImgWrap");
    cityBlock.innerText = city + ", " + country;
    tempBlock.innerText = parseInt(temp) + "°c";
    descriptionBlock.innerText = description + "";
    createImage(icon_url, "currIcon", currImgWrap);
}

createImage = (src, alt, wrap) => {
    let currImg = document.createElement("img");
    currImg.setAttribute("src", src);
    currImg.setAttribute("alt", alt);
    wrap.appendChild(currImg);
}

createImageC = (src, alt, className, wrap) => {
    let currImg = document.createElement("img");
    currImg.setAttribute("src", src);
    currImg.setAttribute("alt", alt);
    currImg.setAttribute("class", className);
    wrap.appendChild(currImg);
}

createDiv = (className, text, wrap) => {
    let fTime = document.createElement("div");
    fTime.setAttribute("class", className);
    fTime.innerText = text;
    wrap.appendChild(fTime);
}

//show current time
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

getTime = () => {
	let d = new Date();
    let dateBlock = document.getElementById("date");
    let timeBlock = document.getElementById("time");
    timeBlock.innerText = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    dateBlock.innerText = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

getTime();

window.setInterval(function() {
    getTime();
}, 1000);


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchAllData)
} else {
    console.log("Geolocation is not supported by this browser.")
}