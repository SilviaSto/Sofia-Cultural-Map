import React, { Component } from 'react';
import '../App.css';


class Sidebar extends Component{

    render(){
        return(
                <nav id='sidebar'>
                    <div className='sidebar-content'>
                        <div className="search-location-input-wrapper">
                            <input
                                type='text'
                                placeholder = 'Filter by landmark'
                                /*value = {}
                                onChange={}*/
                                />
                        </div>
                        <div id='locations'>
                            <ol className='location-list'>
                                <li key='id 'className='location'>list1</li>
                            </ol>
                        </div>
                    </div>
                </nav>
            )
    }
}

export default Sidebar;
