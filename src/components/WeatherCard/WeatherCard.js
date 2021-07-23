import React from 'react';
import './WeatherCard.css'

const WeatherCard = (props) => {
    return (
        <div className="weatherCardDiv">
            <p className="weatherCardDay">{props.day}</p>
            <p className="weatherCardDt">{props.dtTxt}</p>
            <img src={`http://openweathermap.org/img/w/${props.icon}.png`} alt="weather icon" className="weatherCardImg" />
            <p className="weatherCardTemp">{`${props.temp} °C`}</p>
            <p className="weatherCardTempRange">{`${props.tempMin}°C - ${props.tempMax}°C`}</p>
            <p className="weatherCardTemp">{props.weather}</p>
        </div>
    )
}

export default WeatherCard;