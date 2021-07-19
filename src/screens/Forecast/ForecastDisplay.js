import React, {useState, useEffect} from 'react';
import Forecast from './Forecast';
import { Button } from 'react-bootstrap';
import './Forecast.css';

/*
The flow of this app 
The actual data will be returned/displayed in the forecast.js, then the forecast.js will be rendered inside of the return
statement of forecastdisplay.js 
Along will rendering the <Forecast /> compinent, also pass the user input city as an attribute to the Forecast component
*/

const ForecastDisplay = () => {
    const [userCity, setUserCity] = useState('');
    const [showData, setShowData] = useState(false);

    const handleCityChange = (event) => {
        const input = event.target.value;
        setUserCity(input);
    }

    const handleShowData = () => {
        setShowData(true);
    }

    const handleDataChange = () => {
        setShowData(false);
        setUserCity('');
    }

    const handleForecastOnEnter = (event) => {
        if (event.code === 'Enter') {
            handleShowData();
        }
    }

    return (
        <div className="forecastDiv">
            <h1>search for your weather.</h1>
            <h4>search your city's name to get the current weather there</h4>
            <h6><strong>note that multiple results may show up</strong> as there might be multiple cities in the world with that name, check the location to determine which city is the one you are looking for</h6>
            <input value={userCity} onChange={handleCityChange} placeholder="your city" onKeyPress={handleForecastOnEnter} />
            <Button variant="dark" onClick={handleShowData} className="forecastbutton">search</Button>
            <Button variant="dark" onClick={handleDataChange} className="forecastbutton">clear</Button>
            {showData && <Forecast city={userCity}/>}
        </div>
    )
}

export default ForecastDisplay;