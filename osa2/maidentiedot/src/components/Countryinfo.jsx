const Countryinfo =  ({ countries, handleClick, weather })  => {
    const matchesFound = countries.length

    if (matchesFound === 0) {
        return <p>No matches found</p>
    }
    if (matchesFound === 1 && weather) {
        const country = countries[0]
        const languages = Object.values(country.languages)
        const flagURL = country.flags.png
        const weatherURL = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        const temp = weather.main.feels_like - 273.15
        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
                <h3>languages:</h3>
                <ul>
                    {languages.map(language =>
                        <li key={language}>{language}</li>
                    )}
                </ul>
                <img src={flagURL} />
                <h2>Weather in {country.capital[0]}</h2>
                <p>temperature {temp.toFixed(2)} Celsius</p>
                <img src={weatherURL} />
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
    if (matchesFound < 11) {
        return (
            <div>
                {countries.map(country =>
                    <p key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => handleClick(country.name.common)}>
                            show
                        </button>
                    </p>
                )}
            </div>
        )
    }
    return <p>Too many matches, specify another filter</p>
}
export default Countryinfo