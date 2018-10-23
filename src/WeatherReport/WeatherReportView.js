import React from 'react'
import PropTypes from 'prop-types'

const WeatherReportView = props => {
    const userInput = (props) => {
        return(
            <form onSubmit={ props.citySubmit} autocomplete="off">
                <label htmlFor="city"> City Name  </label>
                <input
                    className="city-inp" 
                    type="textbox" 
                    name="city" 
                    placeholder="city"
                    ref = {props.userInputRefHandler}
                    onChange={(e) =>props.changeHandler(e)}
                />
                <input className="city-submit-btn" type="submit" value="submit"/>
                <div 
                    id="autocomplete-container" 
                    ref={props.autoCompleteRefHandler}>
                </div>
                
            </form>
        )
    }

    const displayWeatherCard = (cardList) => cardList.map( card => (
        <div className="col-md-4 weather-card">
        <a href={card.detailLink} target="_blank">
            <div className="city-lbl">
                <h4>City: {card.city}</h4>
            </div>
            <div className="card-header"> 
                <h5> {card.headLine}</h5>
            </div>
            <div className="min-temp">
                Min Temp: {card.minTemp} &nbsp; {card.minTempUnit}
            </div>
            <div className="max-temp">
                Max Temp: {card.maxTemp} &nbsp; {card.maxTempUnit}
            </div>
            <div className="day"> 
                Day: {card.day}
            </div>
            <div className="night">
               Night: {card.night}
            </div>
            <div className="weather-source">
                Source: {card.source}
            </div>
        </a>
        </div>
    ))

    return(
        <div>
            {userInput(props)}
            <div className="row weather-card-container">
                {props.weatherCardList.length > 0 
                    && displayWeatherCard(props.weatherCardList)}
            </div>
        </div>
    )
}

WeatherReportView.propTypes = {
    citySubmit: PropTypes.func.isRequired,
    changeHandler: PropTypes.func.isRequired,
    autoCompleteRefHandler: PropTypes.func.isRequired,
    userInputRefHandler: PropTypes.func.isRequired,
    weatherCardList: PropTypes.arrayOf(PropTypes.shape({
        city: PropTypes.string,
        headLine: PropTypes.string,
        minTemp: PropTypes.string,
        minTempUnit: PropTypes.string,
        maxTemp: PropTypes.string,
        maxTempUnit: PropTypes.string,
        day: PropTypes.string,
        night: PropTypes.string,
        source: PropTypes.string,
        detailLink: PropTypes.string
    })).isRequired
}

WeatherReportView.defaultProps = {
    weatherCardList: []
}

export default WeatherReportView;