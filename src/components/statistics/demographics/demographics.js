import React, {Component} from "react";
import StatisticsAge from "./statistics-age";
import StatisticsClass from "./statistics-class";
import "./demographics.css";

class Demographics extends Component {

    render() {
        return (
            <div>
                <div id="left-column">
                    <StatisticsAge/>
                </div>
                <div id="right-column">
                    <StatisticsClass/>
                </div>
            </div>
        );
    }
}

export default Demographics;
