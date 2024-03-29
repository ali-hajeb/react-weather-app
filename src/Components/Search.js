import React, {Component} from 'react';
import {getAPI} from '../Api/funcs';
import * as ui from '../UI/ui';
import Spinner from '../fa-icon/spinner.svg';
import SearchIcon from '../fa-icon/search-w.svg';
import Location from '../fa-icon/location.svg';

const SearchList = (props) => {
    const setCity = (lat, lon) => {
        props.onClick(lat + ',' + lon);
        document.getElementById('overlayer').setAttribute('aria-hidden', true);
    }
    var content = props.search.length ? props.search.map(item => {
        const { lat, lon, id, name, country } = item;
        return <li id={id} key={id} onTouchStart={ui.clickAnim} onTouchEnd={ui.clickAnim} onClick={() => setCity(lat, lon)} className='list-item'><img src={Location} alt="Location" width='16' /> {name.split(',')[0] + ', ' + country}</li>;
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
                searchIcon.innerHTML = `<img src=${Spinner} alt="Spinner" class='fa-pulse' width='16' />`;
                can_change = false;
            }
            timeout = setTimeout(() => {
                if (searchInput.value) {
                    this.setState({ city: searchInput.value });
                    fetch(getAPI('search', this.state.city))
                        .then(res => res.json())
                        .then(data => {
                            const d = data;
                            searchIcon.innerHTML = `<img src=${SearchIcon} alt="Search" width='16' />`;
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
                            <img src={SearchIcon} alt="Search" width='16' />
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