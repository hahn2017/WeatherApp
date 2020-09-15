let myKey = config.MY_KEY;
const API_URL_1 = 'https://api.openweathermap.org/data/2.5/weather?id=6087824&appid=' + myKey + '&units=metric';
const API_URL_5 = 'https://api.openweathermap.org/data/2.5/forecast?id=6087824&appid=' + myKey + '&units=metric';
let country, city, description, icon_url, temp;

//current weather
axios.get(API_URL_1)
  .then((response)=>{
    country = response.data.sys.country;
    city = response.data.name.slice(4, 11);
    description = response.data.weather[0].description;
    icon_url = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png";
    temp = response.data.main.temp;
    showCurrent();
  })
  .catch((error)=>{
    console.log(error)
  })

//weather forecast
axios.get(API_URL_5)
  .then((response)=>{
      showForecast(response);
  })
  .catch((error)=>{
      console.log(error)
  })

showForecast = (res) => {
    for(let i = 0; i < 5; i++){
        let time = res.data.list[i].dt_txt.slice(11, 16);
        console.log(res.data.list[i].dt_txt);
        console.log(time);
        let imgUrl = "http://openweathermap.org/img/wn/" + res.data.list[i].weather[0].icon + "@2x.png";
        let temp = parseInt(res.data.list[i].main.temp) + "°C";
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

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

window.setInterval(function() {
    let d = new Date();
    let dateBlock = document.getElementById("date");
    let timeBlock = document.getElementById("time");
    timeBlock.innerText = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    dateBlock.innerText = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}, 1000);


