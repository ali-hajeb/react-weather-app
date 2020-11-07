import React from 'react';
import {codeToClass, months, days } from '../Api/funcs';

export const DailyLazy = () => {
    let content = [];
    for (let i = 0; i < 3; i++) {
        content.push(
            <div className='daily-item' key={i + 3} >
                <div className='sync weather-card'>
                    <div className='card-day'>
                        <div className='sync-day'></div>
                    </div>
                    <div className='card-date-time'>
                        <div className='sync-date'></div>
                    </div>
                    <div className='card-sym '>
                        <i className='tqr fad fa-4x fa-cloud' />
                    </div>
                    <div className='card-temp'>
                        <div className='sync-temp-daily'></div>
                    </div>
                    <div className='card-dsc'>
                        <div className='sync-text'></div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='mid'>
            <div className='daily-table'>
                {content}
            </div>
        </div>
    )
}

const Daily = (props) => {
    const content = props.map((el, i) => {
        const { date, day } = el,
            { avgtemp_c, condition } = day,
            { code, text, is_day } = condition,
            d = new Date(date),
            mm = months[d.getMonth()] + ' ' + d.getDate(),
            dd = days[d.getDay()];
        return (
            <div className='daily-item' key={i} >
                <div className='weather-card'>
                    <div className='card-day'>
                        {dd}
                    </div>
                    <div className='card-date-time'>
                        {mm}
                    </div>
                    <div className='card-sym'>
                        <img className='weather-ico-daily' src={codeToClass(code, is_day)} alt={text} ></img>
                    </div>
                    <h3>
                        {parseInt(avgtemp_c)} &deg;C
                    </h3>
                    <div className='card-dsc' style={{ fontSize: 14 + 'px' }}>
                        {text}
                    </div>
                </div>
            </div>
        );
    });
    let contentPlus = [];
    for (let i = 0; i < 3; i++) {
        contentPlus.push(
            <div className='daily-item' key={i + 3} >
                <div className='weather-card'>
                    <div className='card-day'>
                        <div className='sync-day'></div>
                    </div>
                    <div className='card-date-time'>
                        <div className='sync-date'></div>
                    </div>
                    <div className='card-sym '>
                        <i className='tqr fad fa-4x fa-cloud' />
                    </div>
                    <div className='card-temp'>
                        <div className='sync-temp-daily'></div>
                    </div>
                    <div className='card-dsc'>
                        <div className='sync-text'></div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='mid'>
            <div className='daily-table'>
                {content}
                {contentPlus}
            </div>
        </div>
    )
}

export default Daily;