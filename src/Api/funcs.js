import cloud_light from './weather-icons/cloud-light.svg';
import cloud_moon from './weather-icons/cloud-moon.svg';
import cloud_rain_light from './weather-icons/cloud-rain-light.svg';
import cloud_snow_light from './weather-icons/cloud-snow-light.svg';
import clooud_sun from './weather-icons/cloud-sun.svg';
import cloudy from './weather-icons/cloudy.svg';
import moon from './weather-icons/moon.svg';
import rain from './weather-icons/rainy.svg';
import snow from './weather-icons/snow.svg';
import sunny from './weather-icons/sunny.svg';

const getAPI = (name, city, rest='') => {
    return `https://api.weatherapi.com/v1/${name}.json?key=3ab1311cd12149f0bd6125133202409&q=${city}` + rest; // Here you can change the api key
}

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

const   rainy   =   [1063, 1072, 1150, 1153, 1168, 1169, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1240, 1243, 1246],
        snowy   =   [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282],
        rthun   =   [1273, 1276],
        sthun   =   [1279, 1282],
        cloud   =   [1003, 1006, 1009, 1135, 1147, 1030];
        
const codeToClass = (code, isDay=1) => {
    if (code === 1000) {
        if (isDay) {
            return sunny;
        } else return moon;
    }
    else if (code === 1003 || code === 1006) {
        if (isDay) {
            return clooud_sun;
        } else return cloud_moon;
    }
    else if (cloud.includes(code)) {
        return cloudy;
    }
    else if (rainy.includes(code)) {
        return rain;
    }
    else if (snowy.includes(code)) {
        return snow;
    }
    else if (rthun.includes(code)) {
        return cloud_rain_light;
    }
    else if (sthun.includes(code)) {
        return cloud_snow_light;
    }
    else if (code === 1087) {
        return cloud_light;
    }
}

const months = ["Jan", "Feb", "Ma", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export {getAPI, getCookie, codeToClass, months, days};