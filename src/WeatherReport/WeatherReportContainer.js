import React, { Component } from 'react'
import WeatherReportView from './WeatherReportView'
import './WeatherReport.scss'
import { ACCUWEATHER_API } from './Config.js'

class WeatherReportContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showWeatherReport: true,
            weatherCardList: []
        }
        
        this.autoCompleteList = null
        this.userInputElement = null

        this.autoCompleteRefHandler = this.autoCompleteRefHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.getCityList = this.getCityList.bind(this)
        this.updateAutoComplete = this.updateAutoComplete.bind(this)
        this.handleClickEvent = this.handleClickEvent.bind(this)
        this.clearAutoCompleteList = this.clearAutoCompleteList.bind(this)
        this.citySubmit = this.citySubmit.bind(this)
        this.cityList = []
        //this.weatherCardList = []
    }

    componentDidMount() {
        document.addEventListener('click', this.clearAutoCompleteList)
    }

    changeHandler = (event) => {
        window.console.log("text :"+ event.target.value)
        if(event.target.value.length > 1) {
            this.getCityList( event.target.value )
        } else {
            this.clearAutoCompleteList();
        }
    }
    
    citySubmit (event) {
        window.console.log("event target:"+ this.userInputElement.getAttribute("data-key"));
        event.preventDefault()
        if(this.state.weatherCardList.length < 4) {
            var url = ACCUWEATHER_API.FORECASTS_API + this.userInputElement.getAttribute("data-key") + "?apikey=" + ACCUWEATHER_API.API_KEY
            fetch(url)
            .then(res => res.json())
            .then(data => {
                var weatherCardList = this.state.weatherCardList
                weatherCardList.push({
                    city: this.userInputElement.value,
                    headLine: data.Headline.Text,
                    minTemp: data.DailyForecasts[0].Temperature.Minimum.Value,
                    minTempUnit: data.DailyForecasts[0].Temperature.Minimum.Unit,
                    maxTemp: data.DailyForecasts[0].Temperature.Maximum.Value,
                    maxTempUnit: data.DailyForecasts[0].Temperature.Maximum.Unit,
                    day: data.DailyForecasts[0].Day.IconPhrase,
                    night: data.DailyForecasts[0].Night.IconPhrase,
                    source: "AccuWeather",
                    detailLink: data.DailyForecasts[0].Link
                })

                this.setState({
                    weatherCardList
                })
            }) 
        }

    }

    clearAutoCompleteList() {
        while (this.autoCompleteList.firstChild) {
            this.autoCompleteList.removeChild(this.autoCompleteList.firstChild)
        }   
    }

    getCityList = ( userInput ) => {
        var locationList = []
        var url = ACCUWEATHER_API.AUTO_COMPLETE_API  + "?apikey=" +  ACCUWEATHER_API.API_KEY + "&q=" + userInput
        fetch(url)
        .then( res => res.json())
        .then( data => {
            locationList  = data.map( location => {
                const loc = {
                    city: location.LocalizedName,
                    locKey: location.Key
                }
                return loc
            })
            this.updateAutoComplete(locationList)
        } )
    }

    updateAutoComplete = cityList => {
        this.clearAutoCompleteList()

        for(var index = 0; index < cityList.length; index++) {
            var city = document.createElement("DIV")
            city.innerHTML = cityList[index].city
            city.setAttribute('data-key',cityList[index].locKey)
            city.classList.add("auto-complete-item")
            city.addEventListener('click',this.handleClickEvent)
            this.autoCompleteList.appendChild(city)
        }
    }

    handleClickEvent = event => {
        this.userInputElement.value = event.target.innerHTML
        this.userInputElement.setAttribute('data-key',event.target.getAttribute('data-key'))
        this.clearAutoCompleteList()
    }

    autoCompleteRefHandler = element => this.autoCompleteList = element
 
    userInputRefHandler = element => this.userInputElement = element

    render() {
        const props = Object.assign({},this.props,{
            autoCompleteRefHandler: this.autoCompleteRefHandler,
            changeHandler: this.changeHandler,
            userInputRefHandler: this.userInputRefHandler,
            citySubmit: this.citySubmit,
            weatherCardList: this.state.weatherCardList
        })
        return(
            <div className="container weather-report-container">
                <WeatherReportView {...props}/>
            </div>
        )
    }
}

export default WeatherReportContainer