import React from 'react';
import './index.css';
import {useState} from 'react';
import axios from 'axios';
import Forecast from './Component/Forecast';
import Weather from './Component/Weather'
import image from './img/air.png'
import humid from './img/humid.png'
import visible from './img/visible.png'

function App() {
  const [search,setSearch] = useState('')
  const [forecast,setForecast] = useState({})
  const [weather, setWeather] = useState({});
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
   ];
  const Day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const d = new Date()
  const date = `${Day[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}` 
  
  
  const searchHandle = async e =>{
    if(e.key==='Enter'){
      if(search===''){
        alert('Please Enter city Name')
      }
    else{
      try{
     const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&exclude=hourly&appid=${process.env.REACT_APP_API_KEY}`)
        setWeather(result.data)
 
      //forecast api
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&exclude=hourly&appid=${process.env.REACT_APP_API_KEY}`)
        setForecast(res.data)
      }
      
      catch(err){
      alert("Sorry , City Not Found");
      }
    }
  }
  }
 
  

  return (
  <div className={(typeof weather.main != "undefined") ? 'warm' : 'App'}>
      <div className="search-box">
      <i className="plus">+</i>
        <input type="text" placeholder='Enter City Name' 
          value={search}
          onChange={e=>setSearch(e.target.value)}
          onKeyPress={searchHandle}
         />
        {(typeof weather.main === 'undefined')?( <div><h1 className='s1'>About</h1>
        <h3 className='s2'>This is a simple weather application built on React.</h3>
        <h3 className='s3'>This app uses <a href="https://openweathermap.org/api">OpenWeatherMaps</a>  API to get and return current weather data as well as forecast data for any location including over 200,000 cities.</h3>
        <h3 className='s4'>Source Code available on <a href="#">Github</a></h3></div>):''}
      </div>
      {(typeof weather.main != 'undefined') ?(
        <div>
        <h3 className='date'>{date}</h3>        
        <Weather weather={weather} />
        <h3 className='status'>{weather.weather[0].main} </h3>
      <div className='temp'> 
        <p>{Math.round(weather.main.temp)}° </p>
       </div>
       <h3 className='place'>{weather.name} , {weather.sys.country}</h3>
        <p className='dash'>_ _ _ _ _ _ _ _ _ _</p>
      <p className='minmax_temp'><b>{Math.round(weather.main.temp_min)}</b>°c / <b>{Math.round(weather.main.temp_max)}</b>°c</p>
      <div className='main_box'>
      <div className='wind'>
        <p className='w1'>Wind</p>
        <img className='w2' src={image} alt="1" width='60' height='45' />
        <p className='w3'>{(weather.wind.speed * 3.6).toFixed(1)}km/h</p>
      </div>
      <div className='humid'>
        <p className='h1'>Humidity</p>
        <img className='h2' src={humid} alt="2" width='30' height='40' />
        <p className='h3'>{weather.main.humidity}%</p>
      </div>
      <div className='visible'>
        <p className='v1'>Visibility</p>
        <img className='v2' src={visible} alt="3" width='50' height='40' />
        <p className='v3'>{weather.visibility/1000}km</p>
      </div>
      </div>
       <Forecast search={search} forecast={forecast} temp={Math.round(weather.main.temp)} speed={weather.wind.speed}   Day={Day}/>
       </div> 
      ):''   }
     
    </div>
  );
}

export default App;
