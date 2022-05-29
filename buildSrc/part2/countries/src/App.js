import {useState, useEffect} from 'react'
import axios from 'axios'
// TODO 2.14
const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const c = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
  return (
    <>
      <div>
        <p>Find country: <input value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}/></p>
      </div>
      <div>
        {c.length > 10
          ? <p>Too many countries</p>
          : c.length > 1
            ? c.map(country => <p key={country.cca2}>{country.name.common}
              <button value={country.name.common} onClick={(event) => setCountryFilter(event.target.value)}>Show
              </button>
            </p>)
            : c.map(country => {
              return <div key={country.cca2}>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h3>Languages:</h3>
                <ul>
                  {Object.values(country.languages).map((lang) => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.svg} alt=''/>
              </div>
            })
        }
      </div>
    </>
  );
}

export default App;
