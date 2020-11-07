import React, {Component} from 'react';
import {getAPI} from '../Api/funcs';
import * as ui from '../UI/ui';

const SearchList = (props) => {
    const setCity = (lat, lon) => {
        props.onClick(lat + ',' + lon);
        document.getElementById('overlayer').setAttribute('aria-hidden', true);
    }
    var content = props.search.length ? props.search.map(item => {
        const { lat, lon, id, name, country } = item;
        return <li id={id} key={id} onTouchStart={ui.clickAnim} onTouchEnd={ui.clickAnim} onClick={() => setCity(lat, lon)} className='list-item'><i className="fas fa-location"></i> {name.split(',')[0] + ', ' + country}</li>;
    }) : <h4 className='search-404'>Nothing to show</h4>;
    return (
        <div className='search-result'>
            <ul className='result-list'>
                {content}
            </ul>
        </div>
    );
}

class List extends Component {
    state = { city: null, cities: [] };
    componentDidMount() {
        let timeout = null, can_change = true;
        const searchInput = document.getElementById('s'), searchIcon = document.querySelector('.search-icon');
        searchInput.addEventListener('keyup', (e) => {
            clearTimeout(timeout);
            if (can_change) {
                searchIcon.innerHTML = '<i class="fad fa-spinner fa-pulse"></i>';
                can_change = false;
            }
            timeout = setTimeout(() => {
                if (searchInput.value) {
                    this.setState({ city: searchInput.value });
                    fetch(getAPI('search', this.state.city))
                        .then(res => res.json())
                        .then(data => {
                            const d = data;
                            searchIcon.innerHTML = '<i class="far fa-search"></i>';
                            can_change = true;
                            this.setState({ cities: d });
                        });
                }
            }, 750);
        });
    }
    render() {
        return (
            <div id='overlayer' aria-hidden='true' onClick={ui.overLay} onTouchStart={ui.overLay}>
                <div className='search-page' aria-hidden="false">
                    <div className='search-bar' >
                        <div className='search-icon'>
                            <i className="far fa-search"></i>
                        </div>
                        <div className='search-input-holder'>
                            <input id='s' type='search' className='search-input' placeholder='Search ...' />
                        </div>
                    </div>
                    {SearchList({ search: this.state.cities, onClick: this.props.onClick })}
                </div>
            </div>
        );
    }
}

export default List;