import React, {Component} from 'react';


class Sidebar extends Component {

    render(){

        return(
            <div id='sidebar'>
                <div className='search-location-bar'>
                <div className="search-location-input-wrapper">
                    <input
                        type='text'
                        placeholder = 'Search by landmark'
                        /*value = {}
                        onChange={}*/
                        />
                </div>
                </div>

                <div className="search-locations-results">
                    <ol className="location-grid">
                        <li className='locations'>Locations</li>
                    </ol>
                </div>

            </div>
        )
    }
}

export default Sidebar;