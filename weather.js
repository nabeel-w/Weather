const dataContainer = document.getElementById("data-container");
const getData = document.getElementById("get-data");
const apiKey ="d8285afde37227a8da0ebc6892e103e6";
const unit ="metric";
const KtoC=(temp)=>{
    return (temp-273.15).toFixed(2);
}
const windDirection =(num)=>{
    let val=Math.floor((num/22.5)+0.5);
    arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return arr[(val % 16)];
}
const successCallback = (position) => {
    const {latitude,longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(response => response.json())
    .then(response => {
           dataContainer.innerHTML="";
           console.log(response);
           let temp =KtoC(response.main.temp);
           let city = response.name;
           let windSpeed = response.wind.speed;
           let windDir= windDirection(response.wind.deg); 
           let humidity = response.main.humidity;
           let description= response.weather[0].main;
           let img=response.weather[0].icon;
           let postData= document.createElement('div');
           postData.innerHTML=`<h2 class="display-5">${city}</h2> <p class="lead"><img src="https://openweathermap.org/img/wn/${img}.png" alt="weather icon">
           <strong>${description}</strong><br>Temperature: ${temp}°C<br> Humidity: ${humidity}%<br>Wind Speed: ${windSpeed}km/hr ${windDir}</p>`
           dataContainer.appendChild(postData);
        }) 
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };

getData.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
});