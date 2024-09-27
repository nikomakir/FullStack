import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (name, apiKey) => {
    const request =  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default { getAll, getWeather }