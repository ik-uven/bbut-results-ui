import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, Label, Tooltip, XAxis, YAxis,} from 'recharts';
import "./demographics.css";

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <div className="group">
                    <p className="label">{`Åldersgrupp: ${label}`}</p>
                    <p className="label">{`Deltagare: ${payload[0].value}`}</p>
                </div>
            </div>
        );
    }

    return null;
};

export default class StatisticsAge extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadComplete: false,
            ageDemographics: []
        };

        this.loadStatistics = this.loadStatistics.bind(this);

    }

    componentDidMount() {
        this.loadStatistics();
    }

    loadStatistics() {
        fetch('/api/participants/statistics/age')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ageDemographics: data, loadComplete: true})
            })
            .catch(console.log)
    }

    render() {

        if (!this.state.loadComplete) {
            return <div></div>
        }

        if (this.state.ageDemographics.length === 0 && this.state.loadComplete) {
            return <div>Diagram visas då deltagare aktiverats</div>
        }

        return (
            <div>
                <div className="label">Åldersfördelning</div>
                <BarChart
                    fill="#ffffff"
                    width={500}
                    height={300}
                    data={this.state.ageDemographics}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <XAxis dataKey="ageSpan" />
                    <YAxis width={100}>
                        <Label value="Antal" position="center" angle={90}/>
                    </YAxis>
                    <Tooltip content={<CustomTooltip/>} />
                    <Bar dataKey="count" fill="#C3E6CB" />
                    <CartesianGrid strokeDasharray="3 3" />
                </BarChart>
            </div>
        );
    }
}
