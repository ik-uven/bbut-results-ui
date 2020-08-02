import React, {Component} from 'react';
import SockJsClient from "react-stomp";
import "../compontents.css"
import stateTranslator from "../text-service";
import Switch from "../switch/switch";
import {Title} from "../title/title";

class LapRegistrator extends Component {

    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            clientConnected: false,
            results: [],
            sortOnStates: false
        };

        this.reloadResultList = this.reloadResultList.bind(this);
        this.handleStateSortToggle = this.handleStateSortToggle.bind(this);

        this.reloadResultList();
    }

    reloadResultList() {

        fetch('/api/participants')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({results: data})
            })
            .catch(console.log);
    }

    registerLap(id, lapState) {
        fetch('/api/participants/' + id + '/laps', {
            method: 'PUT',
            headers: {"Content-Type": "application/json", "x-client-origin": "web"},
            body: JSON.stringify({
                lapState: lapState
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => this.refresh(id, data))
            .catch(console.log);
    };

    deleteLatestLap(id, lapId) {
        fetch('/api/participants/' + id + '/laps/' + lapId, {
            method: 'DELETE'
        })
            .then(response => {
                return response.json();
            })
            .then(data => this.refresh(id, data))
            .catch(console.log);
    }

    changeParticipantState(id, state) {
        fetch('/api/participants/' + id + '/states/' + state, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"}
        })
            .then(response => {
                return response.json()
            })
            .then(data => this.refresh(id, data))
            .catch(console.log);
    }

    refresh(id, data) {
        const idx = this.state.results.findIndex(element => element.id === id)
        let newResults = [...this.state.results];
        newResults[idx] = data;
        this.setState({results: newResults});
    }

    render() {

        const compareOnStateAndStartNumber = (resultA, resultB) => {
            const num1 = resultA.id;
            const num2 = resultB.id;

            let comparison = 0;

            if (this.state.sortOnStates && resultA.participantState > resultB.participantState) {
                return 1;
            }

            if (this.state.sortOnStates && resultA.participantState < resultB.participantState) {
                return -1;
            }

            if (num1 > num2) {
                return 1;
            }

            if (num1 < num2) {
                return -1;
            }

            return comparison;
        };

        const lapButtons = this.state.results
            .filter(result => result.participantState === "ACTIVE" || result.participantState === "RESIGNED")
            .sort(compareOnStateAndStartNumber)
            .map((result) => {
                let classValue = "";

                const hasRegisteredLaps = result.laps.length > 0;
                const lastLapCompleted = hasRegisteredLaps && result.laps[result.laps.length - 1].state === "COMPLETED";
                const lastLapOverdue = hasRegisteredLaps && result.laps[result.laps.length - 1].state === "OVERDUE";

                if (hasRegisteredLaps) {
                    classValue = lastLapCompleted ? "lap-completed" : "lap-overdue";
                }

                return (
                    <tr key={result.id}>
                        <td>{result.id}</td>
                        <td>{result.firstName + " " + result.lastName}</td>
                        <td>{result.laps.filter(lap => lap.state !== "OVERDUE").length}</td>
                        <td className={classValue}>&nbsp;</td>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button value="registerCompletedLap"
                                        className="btn btn-light"
                                        disabled={result.participantState !== "ACTIVE" || (hasRegisteredLaps && lastLapOverdue)}
                                        onClick={(e) => this.registerLap(result.id, "COMPLETED")}>+
                                </button>
                                <button value="registerOverdueLap"
                                        className="btn btn-light"
                                        disabled={result.participantState !== "ACTIVE" || (hasRegisteredLaps && lastLapOverdue)}
                                        onClick={(e) => this.registerLap(result.id, "OVERDUE")}>x
                                </button>
                                <button value="deleteLap"
                                        className="btn btn-light"
                                        disabled={result.laps.length === 0 || result.participantState !== "ACTIVE"}
                                        onClick={(e) => this.deleteLatestLap(result.id, this.getLatestLapId(result), e)}>-
                                </button>
                            </div>
                        </td>
                        <td>
                            <button value="activate"
                                    disabled={result.participantState === "ACTIVE"}
                                    className={result.participantState === "ACTIVE" ? "bbut-button button-success" : "bbut-button button"}
                                    onClick={(e) => this.changeParticipantState(result.id, "ACTIVE")}>{stateTranslator("ACTIVE")}
                            </button>
                        </td>
                        <td>
                            <button value="resign"
                                    disabled={result.participantState === "RESIGNED"}
                                    className={result.participantState === "RESIGNED" ? "bbut-button button-warning" : "bbut-button button"}
                                    onClick={(e) => this.changeParticipantState(result.id, "RESIGNED")}>{stateTranslator("RESIGNED")}
                            </button>
                        </td>
                    </tr>
                );
            });

        return (
            <div>
                <SockJsClient url={"/api/live"} topics={["/topics/results"]}
                              onMessage={(data) => this.setState({results: data})} ref={(client) => {
                    this.clientRef = client
                }}
                              onConnect={() => {
                                  this.setState({clientConnected: true})
                              }}
                              onDisconnect={() => {
                                  this.setState({clientConnected: false})
                              }}
                              debug={true}/>

                <Title title="Lap registration" />
                <table className="table table-dark table-bordered table-sm" style={{width: 4 + '%'}}>
                    <tbody>
                    <tr>
                        <td colSpan={8}>
                            <div className="items-center">
                                Prioritera aktiva deltagare
                                <Switch
                                    isOn={this.state.sortOnStates}
                                    onColor={'#C3E6CB'}
                                    handleToggle={this.handleStateSortToggle}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="center">#</td>
                        <td className="center">Namn</td>
                        <td className="center" colSpan={2}>Varv</td>
                        <td className="center">Hantera varv</td>
                        <td className="center" colSpan={4}>Hantera status</td>
                    </tr>
                    {lapButtons}
                    </tbody>
                </table>
            </div>
        );
    }

    handleStateSortToggle() {
        this.setState({sortOnStates: !this.state.sortOnStates});
    }

    getLatestLapId(result) {
        return Math.max.apply(Math, result.laps.map(lap => lap.number));
    }
}

export default LapRegistrator;
