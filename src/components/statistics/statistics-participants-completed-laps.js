import React, {Component} from "react";
import {CartesianGrid, Label, Line, LineChart, Tooltip, XAxis} from "recharts";
import YAxis from "recharts/lib/cartesian/YAxis";
import {scaleLinear} from 'd3-scale';
import "./statistics.css"

class StatisticsParticipantsCompletedLaps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statistics: {
                totalParticipants: 0,
                countsPerLaps: []
            }
        };

        this.loadStatisticsLapCounts = this.loadStatisticsLapCounts.bind(this);
    }

    componentDidMount() {
        this.loadStatisticsLapCounts();
    }

    loadStatisticsLapCounts() {
        fetch('/api/participants/statistics/completedlaps')
            .then(response => {
                return response.json()
            })
            .then(data => {
                data.countsPerLaps.unshift({lap: 0, participants: data.totalParticipants});
                this.setState({statistics: data});
                console.log(data);
            })
            .catch(console.log)
    }

    render() {

        const ticks = () => {

            const result = [];

            for (let i = 1; i <= this.state.statistics.totalParticipants; i++) {
                result.push(i);
            }

            return result;
        };

        if (this.state.statistics.countsPerLaps.length > 1) {
            return (
                <div>
                    <div className="left white text-margin">Godkända varv per deltagare</div>
                    <LineChart
                        fill="#ffffff"
                        width={900}
                        height={600}
                        data={this.state.statistics.countsPerLaps}
                        margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                        <XAxis dataKey="lap" height={100} label={"Varv"} />
                        <YAxis scale={scaleLinear()} domain={['auto', 'auto']} ticks={ticks()} width={100}>
                            <Label value="Antal deltagare" position="center" angle={90} />
                        </YAxis>
                        <Tooltip labelStyle={{color: "#C3E6CB"}} contentStyle={{background: "black"}} itemStyle={{background: "black"}} />
                        <CartesianGrid stroke="#666666" />
                        <Line type="monotone" dataKey="participants" stroke="#C3E6CB" strokeWidth="2" yAxisId={0}/>
                    </LineChart>
                </div>
            );
        } else {
            return <div className="white">Diagram visas då deltagare passerat första varvet</div>
        }
    }
}

export default StatisticsParticipantsCompletedLaps
