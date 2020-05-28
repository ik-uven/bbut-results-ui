import React, {Component} from 'react';
import SockJsClient from "react-stomp";

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
                //console.log(data);
            })
            .catch(console.log);
    }

    registerLap(id, lapState) {
        fetch('/api/participants/' + id + '/laps', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                finishTime: "2020-08-08T12:53:00",
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
        //console.log('/api/participants/' + id + '/laps/' + lapId)
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

        const stateTranslator = (state) => {
            let translation = state;

            switch (state) {
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
                console.log(result);
                let classValue = "";

                if (result.laps.length > 0) {
                    classValue = result.laps[result.laps.length-1].state === "COMPLETED" ? "table-success" : "table-warning";
                }

                return (
                    <tr key={result.id}>
                        <td style={{width: 4 + '%', textAlign: "left"}}>{result.id}</td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>{nbsp(result.firstName + " " + result.lastName)}</td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>{nbsp(stateTranslator(result.participantState))}</td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>{result.laps.filter(lap => lap.state !== "OVERDUE").length}</td><td className={classValue}>&nbsp;</td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button value="registerCompletedLap"
                                        className="btn btn-light"
                                        disabled={result.participantState !== "ACTIVE"}
                                        onClick={(e) => this.registerLap(result.id, "COMPLETED")}>+</button>
                                <button value="registerOverdueLap"
                                        className="btn btn-light"
                                        disabled={result.participantState !== "ACTIVE"}
                                        onClick={(e) => this.registerLap(result.id, "OVERDUE")}>x</button>
                                <button value="deleteLap"
                                        className="btn btn-light"
                                        disabled={result.laps.length === 0 || result.participantState !== "ACTIVE"}
                                        onClick={(e) => this.deleteLatestLap(result.id, this.getLatestLapId(result), e)}>-</button>
                            </div>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="activate"
                                    className="btn btn-primary btn-sm"
                                    onClick={(e) => this.changeParticipantState(result.id, "ACTIVE")}>{nbsp("Aktivera")}</button>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="resign"
                                    className="btn btn-primary btn-sm"
                                    onClick={(e) => this.changeParticipantState(result.id, "RESIGNED")}>{nbsp("Avsluta")}</button>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="noShow"
                                    disabled={result.laps.length > 0}
                                    className="btn btn-primary btn-sm"
                                    onClick={(e) => this.changeParticipantState(result.id, "NO_SHOW")}>{nbsp("Ej start")}</button>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="registered"
                                    disabled={result.laps.length > 0}
                                    className="btn btn-primary btn-sm"
                                    onClick={(e) => this.changeParticipantState(result.id, "REGISTERED")}>{nbsp("Anmäld")}</button>
                        </td>
                    </tr>
                );
            });

        return (
            <div>
                <SockJsClient url={ "/api/live" } topics={["/topics/results"]}
                              onMessage={ (data) => this.setState({bbutResults: data}) } ref={ (client) => { this.clientRef = client }}
                              onConnect={ () => { this.setState({ clientConnected: true }) } }
                              onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                              debug={ true }/>

                <table className="table table-dark table-bordered table-sm" style={{width: 4 + '%'}}>
                    <tbody>
                    <tr>
                        <td>#</td><td>Namn</td><td>Status</td><td colSpan={2}>Varv</td><td>Hantera varv</td><td colSpan={4}>Hantera status</td>
                    </tr>
                    {lapButtons}
                    </tbody>
                </table>
            </div>
        );
    }

    getLatestLapId(result) {
        //console.log(result.laps)
        return Math.max.apply(Math, result.laps.map(lap => lap.number));;
    }
}

export default LapRegistrator;
