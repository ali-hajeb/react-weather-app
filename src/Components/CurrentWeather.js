import React from 'react';
import {codeToClass } from '../Api/funcs';
import * as ui from '../UI/ui';

export const CurrentLazy = () => {
    return (
        <div className='t'>
            <div className='top sync'>
                <div className='top-city'>
                    <div className='sync-name'></div>
                    <div className='sync-subname'></div>
                </div>
                <div className='top-weather'>
                    <div className='weather-sym center'>
                        <i className='fas fa-5x fa-cloud' />
                    </div>
                    <div className='weather-temp'>
                        <div className='sync-temp'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Current = (props) => {
    const { name, region, country } = props.location;
    const { temp_c, is_day } = props.current;
    const { code, text } = props.current.condition;
    return (
        <div className='t'>
            <div className='top'>
                <div className='top-city'>
                    <h1 id='el' style={{ marginBottom: 2 + 'px' }}>
                        {name}
                    </h1>
                    <small>{country + ', ' + region}</small>
                    <div className='city-weather'>
                        <h2>{text}</h2>
                        <button data-toggle='#details' className='a-toggle' 
                                onTouchStart={ui.clickAnim} onTouchEnd={ui.clickAnim} 
                                onClick={ui.toggleLink}>Show more</button>
                    </div>
                </div>
                <div className='top-weather'>
                    <div className='weather-sym center'>
                        <img className='weather-ico' src={codeToClass(code, is_day)} alt={text} ></img>
                    </div>
                    <div className='weather-temp'>
                        <h2 className='temp-h2'>
                            {parseInt(temp_c)} &deg;C
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Current;