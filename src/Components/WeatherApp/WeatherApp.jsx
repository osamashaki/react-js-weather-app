import React, {useState} from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'

const WeatherApp = () => {

	let api_key = ''; //your api key here
	const [wicon, setWicon] = useState(cloud_icon);
	const [error, setErrorMessage] = useState("");
	const [show, setShow] = useState(true);
	const timer = setTimeout(() => { setShow(false); }, 4000);

	const Search = async () => {
		const element = document.getElementsByClassName("CityInput");
		let search_txt = element[0].value.trim();
		setErrorMessage();

		if(search_txt==="")
		{
			setShow(true);
			setErrorMessage("Please enter city name!");
			
		}
		else
		{
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${search_txt}&units=Metric&appid=${api_key}`;

			let response = await fetch(url);
			let data = await response.json(); 

			if(data.cod !== '400' && data.cod !== '404')
			{
				
				const humidity = document.getElementsByClassName("humidity-percent");
				const wind = document.getElementsByClassName("wind-rate");
				const temp = document.getElementsByClassName("weather-temp");
				const location = document.getElementsByClassName("weather-location");

				humidity[0].innerHTML = data.main.humidity + '%';
				wind[0].innerHTML = Math.floor(data.wind.speed) + 'km/h';
				temp[0].innerHTML = Math.floor(data.main.temp)+"&deg C";
				location[0].innerHTML = data.name;

				if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n")
				{
					setWicon(clear_icon);
				}
				else if(data.weather[0].icon ==="02d" || data.weather[0].icon ==="02n")
				{
					setWicon(cloud_icon);
				}
				else if(data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n")
				{
					setWicon(drizzle_icon);
				}
				else if(data.weather[0].icon ==="04d" || data.weather[0].icon ==="04n")
				{
					setWicon(drizzle_icon);
				}
				else if(data.weather[0].icon ==="09d" || data.weather[0].icon ==="09n")
				{
					setWicon(rain_icon);
				}
				else if(data.weather[0].icon ==="010d" || data.weather[0].icon ==="010n")
				{
					setWicon(rain_icon);
				}
				else if(data.weather[0].icon ==="013d" || data.weather[0].icon ==="013n")
				{
					setWicon(snow_icon);
				}
				else {
					setWicon(clear_icon);
				}
			}
			else
			{
				setShow(true);
				setErrorMessage("City Not Found!");	
			}

		}

	}

	return (
		<div className="container">
			<div className="top-bar">
				<input type="text" className="CityInput" placeholder="Enter City Name" />
				<div className="search-icon">
					<img src={search_icon} alt="Search" onClick={()=>{Search()}}/>
				</div>
			</div>
			

			
			<div className="error-msg">
				{show && error}
			</div>
			<div className="weather-image">
				<img src={wicon} alt=""/>
			</div>
			<div className="weather-temp">24&deg;C</div>
			<div className="weather-location">Kuala Lumpur</div>
			<div className="data-container">
				<div className="element">
					<img src={humidity_icon} alt="" className="icon" />
					<div className="data">
						<div className="humidity-percent">60%</div>
						<div className="text">Humidity</div>						
					</div>
				</div>
				<div className="element">
					<img src={wind_icon} alt="" className="icon" />
					<div className="data">
						<div className="wind-rate">10km/h</div>
						<div className="text">Wind Speed</div>						
					</div>
				</div>
			</div>
		</div>

	)
}

export default WeatherApp