import React from 'react';

const Details = (props) => {
    const { astro, day } = props;
    const { sunrise, sunset } = astro;
    const { avghumidity, avgtemp_c, maxtemp_c, mintemp_c, uv, daily_chance_of_rain, avgvis_km } = day;
    const table = [
        [<i className="fad fa-det fa-temperature-high"></i>, <><div className='title-table'>Max</div>{parseInt(maxtemp_c)}&deg;C</>, <i className="fad fa-det fa-sunrise"></i>, <><div className='title-table'>Sunrise</div>{sunrise}</>, <i className='fas'>UV</i>, <><div className='title-table'>Index</div>{uv}</>],
        [<i className="fas fa-det fa-temperature-high"></i>, <><div className='title-table'>Avg</div>{parseInt(avgtemp_c)}&deg;C</>, <i className="fad fa-det fa-sunset"></i>, <><div className='title-table'>Sunset</div>{sunset}</>, <i className="fad fa-det fa-cloud-rain"></i>, <><div className='title-table'>Chance</div>{daily_chance_of_rain}%</>],
        [<i className="fad fa-det fa-temperature-low"></i>, <><div className='title-table'>Min</div>{parseInt(mintemp_c)}&deg;C</>, <i className="fas fa-det fa-humidity"></i>, <><div className='title-table'>Humidity</div>{avghumidity}%</>, <i className="fad fa-det fa-eye fa-swap-opacity"></i>, <><div className='title-table'>Visibility</div>{avgvis_km}km</>]
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