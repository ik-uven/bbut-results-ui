import React, {Component} from 'react';
import SockJsClient from "react-stomp";
import "../compontents.css"

class LapRegistrator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clientConnected: false,
            bbutResults: []
        };

        this.reloadResultList = this.reloadResultList.bind(this);

        this.reloadResultList();
    }

    reloadResultList() {

        fetch('/api/participants')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({bbutResults: data})
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
        const idx = this.state.bbutResults.findIndex(element => element.id === id)
        let newResults = [...this.state.bbutResults];
        newResults[idx] = data;
        this.setState({bbutResults: newResults});
    }

    render() {

        const nbsp = (string) => {
            return string !== null ? string.replace(/ /g, "\u00a0") : string;
        };

        const compareOnStartNumber = (resultA, resultB) => {
            const num1 = resultA.id;
            const num2 = resultB.id;

            let comparison = 0;
            if (num1 > num2) {
                comparison = 1;
            } else if (num1 < num2) {
                comparison = -1;
            }

            return comparison;
        };

        const stateTranslator = (participantState) => {
            let translation = participantState;

            switch (participantState) {
                case "REGISTERED":
                    translation = "Anmäld";
                    break;
                case "ACTIVE":
                    translation = "Aktiv";
                    break;
                case "RESIGNED":
                    translation = "Avslutat";
                    break;
                case "NO_SHOW":
                    translation = nbsp("Ej start");
                    break;
                default:
                    break;
            }

            return translation;
        };

        const lapButtons = this.state.bbutResults
            .sort(compareOnStartNumber)
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
                        <td>{nbsp(result.firstName + " " + result.lastName)}</td>
                        <td>{nbsp(stateTranslator(result.participantState))}</td>
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
                                    className="btn btn-primary btn-sm"
                                    onClick={(e) => this.changeParticipantState(result.id, "ACTIVE")}>{nbsp("Aktivera")}</button>
                        </td>
                        <td>
                            <button value="resign"
                                    disabled={result.participantState === "RESIGNED"}
                                    className="btn btn-primary btn-sm"
                                    onClick={(e) => this.changeParticipantState(result.id, "RESIGNED")}>{nbsp("Avsluta")}</button>
                        </td>
                        <td>
                            <button value="noShow"
                                    disabled={result.participantState === "NO_SHOW" || hasRegisteredLaps}
                                    className="btn btn-primary btn-sm"
                                    onClick={(e) => this.changeParticipantState(result.id, "NO_SHOW")}>{nbsp("Ej start")}</button>
                        </td>
                        <td>
                            <button value="registered"
                                    disabled={result.participantState === "REGISTERED" || hasRegisteredLaps}
                                    className="btn btn-primary btn-sm"
                                    onClick={(e) => this.changeParticipantState(result.id, "REGISTERED")}>{nbsp("Anmäld")}</button>
                        </td>
                    </tr>
                );
            });

        return (
            <div>
                <SockJsClient url={"/api/live"} topics={["/topics/results"]}
                              onMessage={(data) => this.setState({bbutResults: data})} ref={(client) => {
                    this.clientRef = client
                }}
                              onConnect={() => {
                                  this.setState({clientConnected: true})
                              }}
                              onDisconnect={() => {
                                  this.setState({clientConnected: false})
                              }}
                              debug={true}/>

                <table className="table table-dark table-bordered table-sm" style={{width: 4 + '%'}}>
                    <tbody>
                    <tr>
                        <td className="center">#</td>
                        <td className="center">Namn</td>
                        <td className="center">Status</td>
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

    getLatestLapId(result) {
        return Math.max.apply(Math, result.laps.map(lap => lap.number));
    }
}

export default LapRegistrator;
