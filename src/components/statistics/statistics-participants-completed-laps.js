import React, {Component} from "react";
import {CartesianGrid, Label, Line, LineChart, Tooltip, XAxis} from "recharts";
import YAxis from "recharts/lib/cartesian/YAxis";
import {scaleLinear} from 'd3-scale';
import "./statistics.css"

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <div className="group">
                    <p className="label">{`Varv: ${label}`}</p>
                    <p className="label">{`Deltagare: ${payload[0].value}`}</p>
                </div>
            </div>
        );
    }

    return null;
};

class StatisticsParticipantsCompletedLaps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadComplete: false,
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
                this.setState({statistics: data, loadComplete: true});
            })
            .catch(console.log)
    }

    render() {

        if (!this.state.loadComplete) {
            return <div></div>
        }

        if (this.state.statistics.countsPerLaps.length === 1 && this.state.loadComplete) {
            return <div className="white">Diagram visas då deltagare passerat första varvet</div>
        }

        const ticks = () => {

            const result = [];

            for (let i = 1; i <= this.state.statistics.totalParticipants; i++) {
                result.push(i);
            }

            return result;
        };

        return (
            <div>
                <div className="left white text-margin">Avklarade varv per deltagare</div>
                <LineChart
                    fill="#ffffff"
                    width={900}
                    height={600}
                    data={this.state.statistics.countsPerLaps}
                    margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                    <XAxis dataKey="lap" height={100} label={"Varv"}/>
                    <YAxis scale={scaleLinear()} domain={['auto', 'auto']} ticks={ticks()} width={100}>
                        <Label value="Antal deltagare" position="center" angle={90}/>
                    </YAxis>
                    <Tooltip content={<CustomTooltip/>}/>
                    <CartesianGrid stroke="#666666"/>
                    <Line type="monotone" dataKey="participants" stroke="#C3E6CB" strokeWidth="2" yAxisId={0}/>
                </LineChart>
            </div>
        );
    }
}

export default StatisticsParticipantsCompletedLaps
