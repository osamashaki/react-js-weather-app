import {useState} from 'react';
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

	let api_key = '27c3536adea90ac099a53b9bb27d6ece';
	const [wicon, setWicon] = useState(cloud_icon);
	const [error, setErrorMessage] = useState("");
	const humidity = document.getElementsByClassName("humidity-percent");
	const wind = document.getElementsByClassName("wind-rate");
	const temp = document.getElementsByClassName("weather-temp");
	const location = document.getElementsByClassName("weather-location");
	const [show, setShow] = useState(true);
	setTimeout(() => { setShow(false); }, 4000);

	let response_clear_icon_code = ["01d", "01n"];
	let response_cloud_icon_code = ["02d", "02n"];
	let response_drizzle_icon_code = ["03d", "03n", "04d", "04n"];
	let response_rain_icon_code = ["09d", "09n", "010d", "010n"];
	let response_snow_icon_code = ["013d", "013n"];



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
				let response_icon = data.weather[0].icon;
				humidity[0].innerHTML = data.main.humidity + '%';
				wind[0].innerHTML = Math.floor(data.wind.speed) + 'km/h';
				temp[0].innerHTML = Math.floor(data.main.temp)+"&deg C";
				location[0].innerHTML = data.name;

				if(response_clear_icon_code.includes(response_icon))
				{
					setWicon(clear_icon);
				}
				else if(response_cloud_icon_code.includes(response_icon))
				{
					setWicon(cloud_icon);
				}
				else if(response_drizzle_icon_code.includes(response_icon))
				{
					setWicon(drizzle_icon);
				}
				else if(response_rain_icon_code.includes(response_icon))
				{
					setWicon(rain_icon);
				}
				else if(response_snow_icon_code.includes(response_icon))
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
			<div className="weather-temp">{temp}&deg;C</div>
			<div className="weather-location">Kuala Lumpur</div>
			<div className="data-container">
				<div className="element">
					<img src={humidity_icon} alt="" className="icon" />
					<div className="data">
						<div className="humidity-percent">{humidity}%</div>
						<div className="text">Humidity</div>						
					</div>
				</div>
				<div className="element">
					<img src={wind_icon} alt="" className="icon" />
					<div className="data">
						<div className="wind-rate">{wind}km/h</div>
						<div className="text">Wind Speed</div>						
					</div>
				</div>
			</div>
		</div>

	)
}

export default WeatherApp