import React, {useState, useEffect} from 'react';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import './FiveDayForecast.css';
import Slider from 'react-slick';

const axios = require('axios').default;

function getDay(utcTime) {
    const a = new Date(utcTime * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[a.getDay()];
    return day;
}

const FiveDayForecast = (props) => {
    const [temp, setTemp] = useState([]);
    const [tempMin, setTempMin] = useState([]);
    const [tempMax, setTempMax] = useState([]);
    const [day, setDay] = useState([]);
    const [dtTxt, setDtTxt] = useState([]);
    const [weather, setWeather] = useState([]);
    const [icon, setIcon] = useState([]);
    const [location, setLocation] = useState('');
    const [invalidProps, setInvalidProps] = useState(false);

    const settings = {
        dots: true,
      //   fade: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    useEffect(() => {
        if (props.city === '' || props.country === '') {
            setInvalidProps(true);
        }

        const userLocation = props.city + ',' + props.country;

        var options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
            params: {q: userLocation, units: 'Standard', lang: 'en'},
            headers: {
              'x-rapidapi-key': '0f11817b07msh207729bc91826edp18e3adjsn26514cca5b43',
              'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
        };
          
        axios.request(options).then((response) => {
            if (!response && (!response.data)) console.error('Invalid response');
            // console.log(response.data['list'][0]['main']['temp']);

            const count = response.data['cnt']
            const data = response.data['list'].map((obj) => {
                return {
                    day: getDay(obj['dt']),
                    dtTxt: obj['dt_txt'],
                    temp: (obj['main']['temp'] - 273.15).toFixed(1),
                    tempMin: (obj['main']['temp_min'] - 273.15).toFixed(1),
                    tempMax: (obj['main']['temp_max'] - 273.15).toFixed(1),
                    weather: obj['weather'][0]['description'],
                    icon: obj['weather'][0]['icon']
                }
            })
            setLocation(response.data['city']['name'] + ', ' + response.data['city']['country']);
            if (data[0].temp === undefined) console.log('Oh we are in trouble');

            for (let i = 0, j = 0, tempArr = [], tempMinArr = [], tempMaxArr = [], dayArr = [], dtTxtArr = [], weatherArr = [], iconArr = []; i < count; i = i + 8, ++j) {
                tempArr[j] = data[i].temp; tempMinArr[j] = data[i].tempMin; tempMaxArr[j] = data[i].tempMax; 
                dayArr[j] = data[i].day; dtTxtArr[j] = data[i].dtTxt; weatherArr[j] = data[i].weather; iconArr[j] = data[i].icon;
                if (j === 4) {
                    setTemp(tempArr); setTempMin(tempMinArr); setTempMax(tempMaxArr); setDay(dayArr); setDtTxt(dtTxtArr); setWeather(weatherArr); setIcon(iconArr);
                }
            }

        }).catch((error) => {
            console.error(error);
        });
    }, [props.city, props.country])

    return (
        <>
        {!invalidProps &&
            <div className="fiveDayForecastPageDiv">
                <h5>{location}</h5>
                <Slider {...settings}>
                    <div><WeatherCard day={day[0]} dtTxt={dtTxt[0]} icon={icon[0]} temp={temp[0]} tempMin={tempMin[0]} tempMax={tempMax[0]} weather={weather[0]} /></div>
                    <div><WeatherCard day={day[1]} dtTxt={dtTxt[1]} icon={icon[1]} temp={temp[1]} tempMin={tempMin[1]} tempMax={tempMax[1]} weather={weather[1]} /></div>
                    <div><WeatherCard day={day[2]} dtTxt={dtTxt[2]} icon={icon[2]} temp={temp[2]} tempMin={tempMin[2]} tempMax={tempMax[2]} weather={weather[2]} /></div>
                    <div><WeatherCard day={day[3]} dtTxt={dtTxt[3]} icon={icon[3]} temp={temp[3]} tempMin={tempMin[3]} tempMax={tempMax[3]} weather={weather[3]} /></div>
                    <div><WeatherCard day={day[4]} dtTxt={dtTxt[4]} icon={icon[4]} temp={temp[4]} tempMin={tempMin[4]} tempMax={tempMax[4]} weather={weather[4]} /></div>
                </Slider>
            </div>
        }
        {invalidProps &&
            <p className="fiveDayForecastPageInvalid">please give both your city and country.</p>
        }
        </>
    )
}

export default FiveDayForecast;