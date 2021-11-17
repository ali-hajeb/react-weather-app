import React, { Component } from 'react';
import './App.css';
import { getAPI } from './Api/funcs';
import * as ui from './UI/ui';
import Details from './Components/Details';
import Hourly from './Components/HourlyWeather';
import List from './Components/Search';
import Daily, { DailyLazy } from './Components/DailyWeather';
import Current, { CurrentLazy } from './Components/CurrentWeather';
import SearchIcon from './fa-icon/search.svg';

class App extends Component {
  constructor(props) {
    super(props);
    const city = localStorage.getItem('city') ? localStorage.getItem('city') : 'Abadan';
    this.state = {
      city: city,
      loaded: false,
      location: {},
      current: {},
      forecast: {}
    }
  }

  handlerListClick = (id) => {
    localStorage.setItem('city', id);
    this.setState({ city: id })
    this.getData(id);
    document.getElementById('s').value = '';
  }

  getData = (city = this.state.city) => {
    this.setState({ loaded: false })
    fetch(getAPI('forecast', city, '&days=5'))
      .then(response => {
        if (!response.ok) throw new Error('Unable to fetch weather updates');
        return response.json();
      })
      .then(data => {
        localStorage.setItem('weatherData', JSON.stringify(data))
        this.setState({ current: data.current, location: data.location, forecast: data.forecast, loaded: true });
      })
      .catch(reason => {
        alert('Unable to fetch weather updates\n(Will load old data if it exists)');
        let data = JSON.parse(localStorage.getItem('weatherData'));
        if (data) this.setState({ current: data.current, location: data.location, forecast: data.forecast, loaded: true });
      });
    console.log('Data Recieved');
  }

  setFontSize = (el, unit = 'px', step = 1) => {
    let fontSize = parseFloat(el.style.fontSize);
    for (let i = fontSize; i >= 0; i -= step) {
      let overflow = ui.isOverflown(el);
      if (overflow) {
        fontSize -= step;
        el.style.fontSize = fontSize + unit;
      }
    }
  }

  componentDidMount() {
    this.getData()
    setInterval(this.getData, 5 * 60 * 1000);
  }

  componentDidUpdate() {
    let dsc = document.getElementsByClassName('card-dsc');
    if (dsc) {
      for (let d of dsc) this.setFontSize(d, 'px', 1);
    }
    if (this.state.loaded) document.title = `${this.state.location.name} | ${this.state.current.temp_c} °C`;
  }

  render() {
    const { location, current, forecast, loaded } = this.state;
    let cur, daily, hourly, det;
    if (loaded) {
      cur = Current({ current: current, location: location });
      daily = Daily(forecast.forecastday);
      hourly = Hourly(forecast.forecastday);
      det = Details(forecast.forecastday[0]);
    } else {
      cur = CurrentLazy();
      daily = DailyLazy();
      hourly = null;
      det = null;
    }
    return (
      <div className='mui-container-fluid mb'>
        <button aria-label='Search' name='Search' className='btn btn-search' variant='fab' onTouchStart={ui.clickAnim} onTouchEnd={ui.clickAnim} onClick={ui.toggleSearchMenu}>
          <img src={SearchIcon} alt="Search" width='16' />
        </button>
        {cur}
        {det}
        {daily}
        {hourly}
        <List onClick={this.handlerListClick} />
      </div>
    )
  }
}

export default App;