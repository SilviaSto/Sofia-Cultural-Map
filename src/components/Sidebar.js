import React, { Component } from 'react';
import '../App.css';


class Sidebar extends Component{




    render(){

        let {query, filterLocation, filterLands} = this.props;
        return(
            
                <nav id='sidebar'>

                    <div className='sidebar-content'>
                        <div className="input-wrapper">
                            <input
                                type='text'
                                placeholder = 'Filter by landmark'
                                value = {query}
                                onChange={(e)=>filterLocation(e.target.value)}
                                />
                        </div>
                        <div id='locations'>
                            <ol className='location-list'>

                                {filterLands.map((filterLand)=>(
                                    <li key={filterLand.title} className='location'>
                                        <a href='#' className='link'>{filterLand.title}</a>
                                    </li>))
                                }

                            </ol>
                        </div>
                    </div>
                </nav>
            )
    }
}

export default Sidebar;
