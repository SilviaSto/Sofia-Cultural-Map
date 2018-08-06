import React, { Component } from 'react';
import '../App.css';


class Sidebar extends Component{

    render(){
        return(
                <section id='sidebar'>
                    <div>
                        <div className="search-location-input-wrapper">
                            <input
                                type='text'
                                placeholder = 'Filter by landmark'
                                /*value = {}
                                onChange={}*/
                                />
                        </div>
                    </div>
                </section>
            )
    }
}

export default Sidebar;
