import React, {Component} from "react";
import ResultItem from "./result-item";
import SockJsClient from "react-stomp";
import BbutTable from "../bbuttable/bbut-table";
import {Title} from "../title/title";
import moment from "moment-timezone";

class ResultList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: props.match.params.id,
            clientConnected: false,
            results: [],
            fetchTime: "",
            settings: {
                resultView: {
                    numberOfColumns: 26,
                    showTeamsColumn: true
                }
            }
        };

        this.loadResultList = this.loadResultList.bind(this);
        this.loadSettings = this.loadSettings.bind(this);
        this.getHighestLapCount = this.getHighestLapCount.bind(this);
    }

    componentDidMount() {
        this.loadResultList();
        this.loadSettings();
    }

    loadResultList() {

        fetch('/api/participants')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({
                    results: data,
                    fetchTime: this.getTime()
                })
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

    getTime() {
        return moment().tz("Europe/Stockholm").format("YYYY-MM-DD hh:mm");
    }

    getHighestLapCount() {
        const defaultMaxCount = this.state.settings.resultView.numberOfColumns;
        const currentMax = Math.max.apply(Math, this.state.results.map(result => result.laps.length));

        return currentMax > defaultMaxCount ? currentMax : defaultMaxCount;
    }

    render() {

        const headerItems = () => {
            const headerItems = [];

            headerItems.push("#", "Namn", "Klubb");

            if (this.state.settings.resultView.showTeamsColumn){
                headerItems.push("Lagnamn");
            }

            headerItems.push("Status", "Varv");

            return headerItems;
        };

        const resultItems = this.state.results
            .filter((result) => result.participantState !== "NO_SHOW")
            .filter(this.onParticipantClass())
            .map((result) => {
                return (
                    <ResultItem key={result.id}
                                result={result}
                                highestLapCount={this.getHighestLapCount()}
                                showTeamsColumn={this.state.settings.resultView.showTeamsColumn}/>
                )
            });

        const title = (type) => {
            const timestamp = this.state.fetchTime;
            const typeString = type ? type + " " + timestamp : timestamp;
            return "Result " + typeString;
        };

        return (
            <div>
                <SockJsClient url={"/api/live"} topics={["/topics/results"]}
                              onMessage={(data) => this.setState({
                                  results: data,
                                  fetchTime: this.getTime()
                              })} ref={(client) => {this.clientRef = client}}
                              onConnect={() => {
                                  this.setState({clientConnected: true})
                              }}
                              onDisconnect={() => {
                                  this.setState({clientConnected: false})
                              }}
                              debug={true}/>

                <Title title={title(this.state.type)} />
                <BbutTable headers={headerItems()}
                           items={resultItems}
                           showTeamsColumn={this.state.settings.resultView.showTeamsColumn}
                           highestLapCount={this.getHighestLapCount()}/>
            </div>
        );
    }

    onParticipantClass() {
        return (result) => {
            if (this.state.type === "men" || this.state.type === "women") {
                const filterValue = this.state.type === "women" ? "WOMEN" : "MEN";
                return result.participantClass === filterValue;
            } else {
                return result.id > 0;
            }
        };
    }
}

export default ResultList;

