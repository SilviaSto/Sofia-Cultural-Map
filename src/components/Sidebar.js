import React, {Component} from 'react';


class Sidebar extends Component {

    render(){

        return(
            <div className='sidebar'>
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
            
            </div>
        )
    }
}

export default Sidebar;