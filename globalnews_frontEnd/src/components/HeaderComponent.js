import React from 'react';
import { Link } from 'react-router-dom';


function Header(props) {
    return(
    <div className="">
        <div className="container">
            <div className="row">             
                <div className="col-12 ">
                    <h2>Global News</h2>            
                </div>
                <div className="offset-3 col-9">
                    <hr color="black"></hr>
                </div>
                
            </div>
         
        </div>
    </div>
    )
}

export default Header;