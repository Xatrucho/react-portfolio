import React, { Component} from "react";
import  PortfolioItem from './portfolio-item'

export default class PortfolioContainer extends Component {
    //state
    //lifecycle hooks
    render() {
        return (
            <div>
                <h2>Portfolio items here updated.....</h2>

                <PortfolioItem />
            </div>
        )
    }
}