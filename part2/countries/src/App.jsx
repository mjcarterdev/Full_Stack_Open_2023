import { useEffect } from 'react';
import { useState } from 'react';
import countriesService from './services/countriesService';
import weatherService from './services/weatherService';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState('');
  const [weather, setWeather] = useState({});
  console.log('weather: ', weather);

  useEffect(() => {
    console.log(show);
    if (show.length === 1) {
      weatherService
        .getWeather(show[0].capital)
        .then((data) => setWeather(data));
    }
  }, [show]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search.length > 0) {
      const filteredCountries = countries.filter((country) =>
        country.name.official
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setFilteredCountries(filteredCountries);
      if (filteredCountries.length == 1) {
        setShow(filteredCountries);
      }
    } else {
      countriesService.getAll().then((data) => setCountries(data));
    }
  };

  return (
    <div>
      <h1>Countries</h1>
      <div>
        find countries{' '}
        <input
          value={search}
          onChange={handleSearch}
          onKeyUp={(event) => {
            if (event.key === 'Backspace') {
              handleSearch(event);
            }
          }}
        />
      </div>
      <div>
        {filteredCountries.length == 1 && (
          <>
            <h1>{filteredCountries[0].name.common}</h1>
            <br />
            <p>capital: {filteredCountries[0].capital}</p>
            <p>area: {filteredCountries[0].area}</p>
            <br />
            <h3>Languages:</h3>
            <ul>
              {Object.values(filteredCountries[0].languages).map(
                (item, index) => {
                  return <li key={index}>{item}</li>;
                }
              )}
            </ul>
            <img src={filteredCountries[0].flags['png']}></img>
          </>
        )}
        {filteredCountries.length > 10
          ? 'Too many matches, specify another filter'
          : filteredCountries.length > 1 &&
            filteredCountries.map((country) => {
              return (
                <div key={country.name.official}>
                  {country.name.official}
                  <button
                    style={{ marginLeft: '8px' }}
                    onClick={() => setShow([country])}
                  >
                    show
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
