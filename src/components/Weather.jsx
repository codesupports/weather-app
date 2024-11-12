
import { useEffect, useState } from 'react'
import './weather.css'
import './background.css'
import humadity from '../assets/Humadity.svg'
import temperature from '../assets/temperature.svg'
import wind from '../assets/wind.svg'

const Weather = () => {
    const [city, setCity] = useState("");
    const [cityName, setCityName] = useState();
    const [data, setData] = useState();

    // let dateTime = new Date().toLocaleString();
    let dateTime = `${new Date().toLocaleString('en-US', { weekday: 'long' })}, ${new Date().getDate()} ${new Date().toLocaleString('en-US', { month: 'long' })} ${new Date().getFullYear()} | ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;



    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName ? cityName : "Delhi"}&appid=71a222a60e88e62b1eb3f417364dc3ec&units=metric`

    const handleAddCity = () => {
        setCityName(city)
        getApi()
        setCity('')
    }

    const getApi = async () => {
        try {
            const response = await fetch(BASE_URL)
            if (response.status === 404) {

                throw new Error(alert("Check state name properly"));
            }
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            if (response.status === 200) {
                const data = await response.json();
                setData(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getApi()
    }, [cityName])
    // console.log(data, BASE_URL)

    let sunrise = data ? data.sys.sunrise : null;
    let sunriseTime = new Date(sunrise * 1000);
    let sunriseTimeString = sunriseTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });;

    let sunset = data ? data.sys.sunset : null;
    let sunsetTime = new Date(sunset * 1000);
    let sunsetTimeString = sunsetTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <>

            <main>
                <div className="conatiner">
                    <section class="wrapper">
                        <div id="stars"></div>
                        <div id="stars2"></div>
                        <div id="stars3"></div>
                    </section>
                    <section className="header-row">
                        <div className="city-name">
                            <h1>{data ? data.name : cityName}</h1>
                            <p>{dateTime}</p>
                        </div>
                        <div className="search-bar">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Enter city name"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <button onClick={() => handleAddCity()}>Search</button>
                        </div>
                    </section>

                    <section className="weather-row">
                        <div className="temprature">
                            <h3>{data ? (data.main.temp | 0) : null}</h3>
                            <p>
                                <span><b>&deg;C</b> | &deg;F</span>
                                <span>{data ? (data.weather[0].description) : null}</span>
                            </p>
                        </div>
                        <div className="temp-info">
                            <div className="weather-img">
                                <img src={`https://rodrigokamada.github.io/openweathermap/images/${data?.weather[0]?.icon}_t@4x.png`} alt='' />
                            </div>
                            <div className="weather-img-info">
                                <ul>
                                    <li><img src={humadity} alt='' /> Feels Like:  {data ? (data.main.feels_like | 0) : null} &deg;C</li>
                                    <li><img src={temperature} alt='' /> Humidity: {data ? (data.main.humidity | 0) : null} %</li>
                                    <li><img src={wind} alt='' /> Wind: {data ? (data.wind.speed) : null} km/h</li>

                                </ul>
                            </div>

                        </div>
                    </section>
                    <section className='upcoming-weather'>
                        <div className='sunrise'>
                            <p>Sunrise</p>
                            <img src='./sunrise.png' alt='' />
                            <p>{sunriseTimeString}</p>
                        </div>
                        <div className='sunset'>
                            <p>Sunset</p>
                            <img src='./sunset.png' alt='' />
                            <p>{sunsetTimeString}</p>
                        </div>
                        <div className='minTemp'>
                            <p>Min Temp.</p>
                            <img src='./temperature-c.png' alt='' />
                            <p>{data ? (data.main.temp_min | 0) : null} &deg;C </p>
                        </div>
                        <div className='maxTemp'>
                            <p>Max Temp.</p>
                            <img src='./temperature-c.png' alt='' />
                            <p>{data ? (data.main.temp_max | 0) : null} &deg;C </p>
                        </div>
                        <div className='country'>
                            <p>Country</p>
                            <img src={`https://flagsapi.com/${data ? data.sys.country : null}/flat/64.png`} alt="" />
                            <p>{sunsetTimeString}</p>
                        </div>
                    </section>

                </div>
            </main>
        </>
    )
}
export default Weather;