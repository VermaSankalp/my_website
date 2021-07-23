import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
const axios = require('axios').default;

//The time (dt) values are really close by, might also need to display longitude and latitude as the location might be the reason for the different weathers
//Use latlong.net to show the viewer where their specified lat and long are for: https://www.latlong.net/c/?lat={the_lat}&long={the_long}

function convertDt(utcTime) {
    var a = new Date(utcTime * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = "0" + a.getMinutes();
    var sec = "0" + a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + String(min).substr(-2) + ':' + String(sec).substr(-2) ;
    return time;
}


const Forecast = (props) => {
    const [temp, setTemp] = useState([]);
    const [tempMin, setTempMin] = useState([]);
    const [tempMax, setTempMax] = useState([]);
    const [tempFeelLike, setTempFeelLike] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [weather, setWeather] = useState([]);
    const [dt, setDt] = useState([]);
    const [coord, setCoord] = useState([]);
    const [country, setCountry] = useState([]);

    useEffect(() => {
        var options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/find',
            params: {
              q: props.city,
              cnt: '20',
              mode: 'null',
              lon: '0',
              type: 'link, accurate',
              lat: '0',
              units: 'imperial, metric'
            },
            headers: {
              'x-rapidapi-key': '0f11817b07msh207729bc91826edp18e3adjsn26514cca5b43',
              'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
        };
    
    axios.request(options).then(
        (response) => {
            if (!response && !(response.data)) console.error('Invalid response');

            const count = response.data.count;
            if (count === 0) console.error('Invalid count');

            const data = response.data.list.map((obj) => {
                    return {
                        kelvin_temp: (obj.main.temp - 273.15).toFixed(1),
                        kelvin_temp_min: (obj.main.temp_min - 273.15).toFixed(1),
                        kelvin_temp_max: (obj.main.temp_max - 273.15).toFixed(1),
                        weather: obj.weather[0].description,
                        humidity: obj.main.humidity, 
                        kelvin_feels_like: (obj.main.feels_like - 273.15).toFixed(1),
                        dt: obj.dt,
                        coordinates: [obj.coord.lat, obj.coord.lon],
                        country: obj.name + ', ' + obj.sys.country
                    }
            })

            for (let i = 0, tempArr = [], tempMinArr = [], tempMaxArr = [], tempFeelLikeArr = [], humidityArr = [], weatherArr = [], dtArr = [], coordArr = [], countryArr = []; i < count; ++i) {
                if (count === 0) break;

                tempArr[i] = data[i].kelvin_temp; tempMinArr[i] = data[i].kelvin_temp_min; tempMaxArr[i] = data[i].kelvin_temp_max;
                tempFeelLikeArr[i] = data[i].kelvin_feels_like; humidityArr[i] = data[i].humidity; weatherArr[i] = data[i].weather;
                dtArr[i] = convertDt(data[i].dt); coordArr[i] = data[i].coordinates; countryArr[i] = data[i].country;

                if (i === (count - 1)) {
                    setTemp(tempArr); setTempMin(tempMinArr); setTempMax(tempMaxArr); setTempFeelLike(tempFeelLikeArr); setHumidity(humidityArr); setWeather(weatherArr);
                    setDt(dtArr); setCoord(coordArr); setCountry(countryArr);
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [props.city])

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>time</th>
                    {dt.map((time) => {
                        return (
                            <td>{time}</td>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>location</th>
                    {country.map((value) => {
                        return (
                            <td>{value}</td>
                        )
                    })}
                </tr>
                <tr>
                    <th>weather</th>
                    {weather.map((value) => {
                        return (
                            <td>{value}</td>
                        )
                    })}
                </tr>
                <tr>
                    <th>temperature (celsius)</th>
                    {temp.map((value) => {
                        return (
                            <td>{value}</td>
                        )
                    })}
                </tr>
                <tr>
                    <th>minimum temperature (celsius)</th>
                    {tempMin.map((value) => {
                        return (
                            <td>{value}</td>
                        )
                    })}
                </tr>
                <tr>
                    <th>maximum temperature (celsius)</th>
                    {tempMax.map((value) => {
                        return (
                            <td>{value}</td>
                        )
                    })}
                </tr>
                <tr>
                    <th>temperature feel-like (celsius)</th>
                    {tempFeelLike.map((value) => {
                        return (
                            <td>{value}</td>
                        )
                    })}
                </tr>
                <tr>
                    <th>humidity (%)</th>
                    {humidity.map((value) => {
                        return (
                            <td>{value}</td>
                        )
                    })}
                </tr>
                <tr>
                    <th>location-coordinates (latitude-longitude)</th>
                    {coord.map((value) => {
                        return (
                            <td>
                                {value}
                                <br/>
                                <a href={`https://www.latlong.net/c/?lat=${value[0]}&long=${value[1]}`} target="_blank" rel="noreferrer">
                                    click to check this location on a map
                                </a>
                            </td>
                        )
                    })}
                </tr>
            </tbody>
        </Table>
    )
}

export default Forecast;