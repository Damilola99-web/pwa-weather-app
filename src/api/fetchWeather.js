import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f799723489c86740cc1e2de019f1d5cb'

export async function fetchWeather(query) {
    let error;
    let data;
    await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY
        }
    }).then(res => {
        data = res.data
    }).catch(err => {
        error = err.response.data.message
    })

    return {data , error}
}