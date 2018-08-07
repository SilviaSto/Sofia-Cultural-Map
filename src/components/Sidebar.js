import React, { Component } from 'react';
import landmarks from '../data/landmarks';
import '../App.css';


class Sidebar extends Component{




    render(){
        return(
                <nav id='sidebar'>

                    <div className='sidebar-content'>
                        <div className="input-wrapper">
                            <input
                                type='text'
                                placeholder = 'Filter by landmark'
                                /*value = {}
                                onChange={}*/
                                />
                        </div>
                        <div id='locations'>
                            <ol className='location-list'>
                                {landmarks.map((landmark)=>(
                                    <li key={landmark.title} className='location'>
                                        {landmark.title}
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
