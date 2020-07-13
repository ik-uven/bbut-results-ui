import React, {Component} from 'react';
import {Cell, Pie, PieChart} from 'recharts';
import Legend from "recharts/lib/component/Legend";
import "./demographics.css";
import {classTranslator} from "../../text-service";

const data = [
    {name: 'Herrar', value: 34},
    {name: 'Damer', value: 8}
];

const COLORS = ['#C3E6CB', '#FFFFCC'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default class StatisticsClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            classDemographics: []
        };

        this.loadStatistics = this.loadStatistics.bind(this);

    }

    componentDidMount() {
        this.loadStatistics();
    }

    loadStatistics() {
        fetch('/api/participants/statistics/class')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({classDemographics: data})
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <div className="label">Klassfördelning</div>
                <PieChart width={400} height={400}>
                    <Pie
                        data={this.state.classDemographics}
                        cx={270}
                        cy={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                    >
                        {
                            this.state.classDemographics.map((entry, index) => <Cell key={`cell-${index}`} name={classTranslator(entry.name) + ` (${entry.count})`} fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                    <Legend width={540} verticalAlign={"top"} />
                </PieChart>
            </div>
        );
    }
}
