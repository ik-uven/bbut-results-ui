import React, {Component} from "react";
import StatisticsItem from "./statistics.item";
import BbutTable from "../bbuttable/bbut-table";

class StatisticsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statistics: [],
            settings: {
                resultView: {
                    numberOfColumns: 26,
                    showTeamsColumn: true
                }
            }
        };

        this.loadStatisticsList = this.loadStatisticsList.bind(this);
        this.loadSettings = this.loadSettings.bind(this);
        this.getHighestLapCount = this.getHighestLapCount.bind(this);
    }

    componentDidMount() {
        this.loadStatisticsList();
    }

    loadStatisticsList() {
        fetch('/api/participants/statistics')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({statistics: data})
            })
            .catch(console.log)
    }

    loadSettings() {
        fetch('/api/settings')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({settings: data})
            })
            .catch(console.log)
    }

    getHighestLapCount() {
        const defaultMaxCount = this.state.settings.resultView.numberOfColumns;
        const currentMax = Math.max.apply(Math, this.state.statistics.map(statistic => statistic.lapDurations.length));

        return currentMax > defaultMaxCount ? currentMax : defaultMaxCount;
    }

    render() {

        const headerItems = () => {
            const headerItems = [];

            headerItems.push("#", "Namn", "Klubb");

            if (this.state.settings.resultView.showTeamsColumn) {
                headerItems.push("Lagnamn");
            }

            headerItems.push("Genomsnittlig varvtid");

            return headerItems;
        };

        const statisticsItems = this.state.statistics
            .map((statistic) => {
                return (
                    <StatisticsItem key={statistic.participantId}
                                    statistic={statistic}
                                    highestLapCount={this.getHighestLapCount()}
                                    showTeamsColumn={this.state.settings.resultView.showTeamsColumn} />
                )
            });

        return (
            <div>
                <BbutTable headers={headerItems()}
                           items={statisticsItems}
                           showTeamsColumn={this.state.settings.resultView.showTeamsColumn}
                           highestLapCount={this.getHighestLapCount()}/>
            </div>
        );
    }
}

export default StatisticsList;
