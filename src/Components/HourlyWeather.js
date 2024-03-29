import React from 'react';
import {codeToClass} from '../Api/funcs';
import * as ui from '../UI/ui';
import Clock from '../fa-icon/clock.svg';
import Umbrella from '../fa-icon/umbrella.svg';

const Hourly = (props) => {
    const listData = (data, s = 0, e) => {
        return (
            data.slice(s, e).map((hour, i) => {
                const { condition, temp_c, is_day, chance_of_rain, time } = hour;
                const { code, text } = condition;
                const h = time.split(' ');
                return (
                    <div className='hourly-item' key={i}>
                        <div className='hourly-item-clock'><img src={Clock} alt='Clock' width='16' height='16' /></div>
                        <div className='hourly-time'>{h[1]}</div>
                        <img className='hourly-ico' src={codeToClass(code, is_day)} alt={text} ></img>
                        <div className='hourly-temp'>{parseInt(temp_c)} &deg;C</div>
                        <div className='hourly-desc'>{text}</div>
                        <div><img src={Umbrella} alt='Clock' width='16' height='16' /> {chance_of_rain}%</div>
                    </div>
                );
            })
        );
    }

    // rendering hourly predictions into 2 columns
    const date = new Date();
    const hour = date.getHours();
    let hourCollection = props[0].hour.slice(hour);
    if (hourCollection.length < 24) {
        const differ = 24 - hourCollection.length;
        hourCollection = hourCollection.concat(props[1].hour.slice(0, differ));
    }
    const content_r = listData(hourCollection, 0, 12);
    const content_l = listData(hourCollection, 12, 24);
    return (
        <>
            <div id='hourly' className="bot" aria-expanded='false'>
                <div className='hourly-container'>
                    <div className="hourly-col mr-lg-6">
                        {content_r}
                    </div>
                    <div className='hourly-col ml-lg-6'>
                        {content_l}
                    </div>
                </div>
            </div>
            <button data-toggle='#hourly' className='a-toggle' onTouchStart={ui.clickAnim} onTouchEnd={ui.clickAnim} onClick={e => ui.toggleLink(e,160)}>Show more</button>
        </>
    );
}

export default Hourly;