import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';

import './App.css';

function App() {
	const [ query, setQuery ] = useState('');
	const [ weather, setWeather ] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

	const search = async (e) => {
    if (e.key === 'Enter') {
      setError(null)
      setWeather({})
      setLoading(true)
      const { data, error } = await fetchWeather(query);
      if (data || error) {
        setLoading(false)
      }
			setWeather(data);
			setError(error);
			setQuery('');
		}
	};
	return (
		<div className="main-container">
			<input
				type="text"
				className="search"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyPress={search}
			/>
			{weather?.main && (
				<div className="city">
					<h2 className="city-name">
						<span>{weather.name}</span>
						<sup>{weather.sys.country}</sup>
					</h2>
					<div className="city-temp">
						{Math.round(weather.main.temp)}
						<sup>&deg;C</sup>
					</div>
					<div className="info">
						<img
							className="city-icon"
							src={`https://openweathermap.org/img/wn/${weather
								.weather[0].icon}@2x.png`}
							alt="weather"
						/>
						<p>{weather.weather[0].description}</p>
					</div>
				</div>
			)}
			{error && (
				<div className="city">
					<h2 className="city-name">Error : {error}</h2>
				</div>
			)}
			{loading && (
				<div className="city">
					<h2 className="city-name">Loading...</h2>
				</div>
			)}
		</div>
	);
}

export default App;
