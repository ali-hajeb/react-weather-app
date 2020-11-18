import React from 'react';
import Sunrise from '../fa-icon/sunrise.svg';
import Sunset from '../fa-icon/sunset.svg';
import TempHigh from '../fa-icon/temperature-high.svg';
import TempLow from '../fa-icon/temperature-low.svg';
import TempAvg from '../fa-icon/temperature-avg.svg';
import Eye from '../fa-icon/eye.svg';
import CloudRain from '../fa-icon/cloud-rain.svg';
import Humidity from '../fa-icon/humidity.svg';

const Details = (props) => {
    const { astro, day } = props;
    const { sunrise, sunset } = astro;
    const { avghumidity, avgtemp_c, maxtemp_c, mintemp_c, uv, daily_chance_of_rain, avgvis_km } = day;
    const table = [
        [
            <img src={TempHigh} alt='Max Temperature' width='25' />,
            <><div className='title-table'>Max</div>{parseInt(maxtemp_c)}&deg;C</>, 
            <img src={Sunrise} alt='Sunrise' width='25' />, 
            <><div className='title-table'>Sunrise</div>{sunrise}</>, 
            <i className='f'>UV</i>, 
            <><div className='title-table'>Index</div>{uv}</>
        ],
        [
            <img src={TempAvg} alt='Avg Temperature' width='25' />, 
            <><div className='title-table'>Avg</div>{parseInt(avgtemp_c)}&deg;C</>, 
            <img src={Sunset} alt='Sunset' width='25' />, 
            <><div className='title-table'>Sunset</div>{sunset}</>, 
            <img src={CloudRain} alt='Chance of Rain' width='25' />, 
            <><div className='title-table'>Chance</div>{daily_chance_of_rain}%</>
        ],
        [
            <img src={TempLow} alt='Low Temperature' width='25' />, 
            <><div className='title-table'>Min</div>{parseInt(mintemp_c)}&deg;C</>, 
            <img src={Humidity} alt='Humidity' width='18' />, 
            <><div className='title-table'>Humidity</div>{avghumidity}%</>, 
            <img src={Eye} alt='Visibility' width='25' />, 
            <><div className='title-table'>Visibility</div>{avgvis_km}km</>
        ]
    ];
    const content = table.map((item, i) => {
        let cells = [], k = 0;
        for (let x of item) cells.push(<td key={k++}>{x}</td>);
        return (<tr key={i}>{cells}</tr>);
    });

    return (
        <div id='details' className='weather-detail' aria-expanded='false'>
            <table className='mui-table mui-table--bordered'>
                <tbody className='table-fa'>
                    {content}
                </tbody>
            </table>
        </div>
    )
}

export default Details;