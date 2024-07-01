
import './App.css';
import propTypes from 'prop-types';
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rainy.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import thunderIcon from "./assets/thunder.png";
import mistIcon from "./assets/mist.png";
import humidityIcon from "./assets/humidity.png";
import { useState,useEffect } from 'react';

const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity}) => {
 return( <>
  <div className="image">
    <img src={icon} alt="Image"/>
  </div>
  <div className="temp">{temp}C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="log">longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="humidity" className="icon" />
      <div className="data"><div className="humidity-percent">{humidity}%</div>
      <div className="text">Humidity</div></div>
    </div>
    <div className="element">
      <img src={windIcon} alt="wind" className="icon" />
      <div className="data"><div className="wind-speed">{wind} km/h</div>
      <div className="text">Wind Speed</div></div>
    </div>
  </div>
  </>
 )
};
WeatherDetails.propTypes={
  icon:propTypes.string.isRequired,
  temp:propTypes.number.isRequired,
  city:propTypes.string.isRequired,
  country:propTypes.string.isRequired,
  lat:propTypes.number.isRequired,
  log:propTypes.number.isRequired,
  wind:propTypes.number.isRequired,
  humidity:propTypes.number.isRequired,
};


function App() {
  const [text,setText]=useState("City")
  const [icon,setIcon]=useState(clearIcon);
  const [temp,setTemp]=useState(0);
  const [city,setcity]=useState("city");
  const [country,setcountry]=useState("country");
  const [lat,setlat]=useState(0);
  const [log,setlog]=useState(0);
  const [wind,setwind]=useState(0);
  const [humidity,sethumidity]=useState(0);
  const [citynotfound,setcitynotfound]=useState(false);
  const [loading,setloading]=useState(true);
  const [error,setError]=useState(null);
  const weatherIconmap ={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":cloudIcon,
    "03n":cloudIcon,
    "04d":cloudIcon,
    "04n":cloudIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "11d":thunderIcon,
    "11n":thunderIcon,
    "13d":snowIcon,
    "13n":snowIcon,
    "50d":mistIcon,
    "50n":mistIcon
  }
  const search=async() =>{
    let apikey=`68829a2937f37abeb0661fbb368bac2a`;
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=68829a2937f37abeb0661fbb368bac2a&units=metric`;
  

  try{
    
    let res=await fetch(url);
    let data=await res.json();
    //console.log(data);
    if (data.cod === "404"){
      console.error("City not found");
      setcitynotfound(true);
      setloading(false);
      return;
    }
    sethumidity(data.main.humidity);
    setwind(data.wind.speed);
    setTemp(data.main.temp);
    setcity(data.name);
    setcountry(data.sys.country);
    setlat(data.coord.lat);
    setlog(data.coord.lon);
    const weatherIconcode=data.weather[0].icon;
    setIcon(weatherIconmap[weatherIconcode] || clearIcon);
    setcitynotfound(false);

  }catch(error){
    console.error("An error:",error);
    setError("An error occured while fetching weather data.");
  }finally{
   setloading(false);
  }
  };
  const Handlecity =(e) =>{
    setText(e.target.value);
  };
  const handleKeyDown=(e) =>{
    if (e.key === "Enter"){
      search();
    }

  }
  useEffect(function (){
    search();
  },[]);



  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type='text' className='cityInput' value={text} onKeyDown={handleKeyDown} onChange={Handlecity} placeholder='Search City'/>
          <div className="search-icon" onClick={() =>search()}>
            <img src={searchIcon}  alt="search" />
          </div>
          </div>
          {loading && <div className="loading-message">loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {citynotfound && <div className="citynotfound">City not found</div>}
          {!loading && !citynotfound && <WeatherDetails icon={icon} temp= {temp} city={city} country={country} lat={lat} log={log} wind={wind} humidity={humidity}/>}
          <p className="copyright">Designed by <span>sekar kumaran</span>
          </p>
      </div>
      
      
    </>
  )
}

export default App;
