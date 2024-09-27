import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countryService from './services/countries'
import Countryinfo from './components/Countryinfo'

const App = () => {
  const [findCountry, setFindCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    countryService.getAll()
    .then(countrylist =>
      setCountries(countrylist)
    )
  }, [])

  useEffect(() => {
    setCountriesToShow(countries.filter(country =>
      country.name.common.toLowerCase().includes(findCountry.toLowerCase())
    ))
  },[findCountry])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      countryService.getWeather(countriesToShow[0].capital[0], api_key)
      .then(currentWeather =>
        setWeather(currentWeather)
      )
    }
  },[findCountry])

  const handleShow = (name) => {
    setCountriesToShow(countries.filter(country =>
      country.name.common === name))
  }

  const handleFilter = (event) => setFindCountry(event.target.value)

  return (
    <div>
    <Filter filter={findCountry} handleFilter={handleFilter} />
    <Countryinfo countries={countriesToShow} handleClick={handleShow}
    weather={weather} />
    </div>
  )
}

export default App
