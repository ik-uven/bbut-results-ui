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
            .then(response => console.log(response.status))
            .catch(console.log);
    };

    deleteLatestLap(id, lapId) {
        console.log('/api/participants/' + id + '/laps/' + lapId)
        fetch('/api/participants/' + id + '/laps/' + lapId, {
            method: 'DELETE'
        })
            .then(response => console.log(response.status))
            .catch(console.log);
    }

    changeParticipantState(id, state) {
        fetch('/api/participants/' + id + '/states/' + state, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"}
        })
            .then(response => console.log(response.status))
            .catch(console.log);
    }

    render() {

        const nbsp = (string) => {
            return string !== null ? string.replace(/ /g, "\u00a0") : string;
        }

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
        }

        const lapButtons = this.state.bbutResults
            .sort(compareOnStartNumber)
            .filter((result) => result.participantState !== "NO_SHOW")
            .map((result) => {
                return (
                    <tr key={result.id}>
                        <td style={{width: 4 + '%', textAlign: "left"}}>{result.id}</td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>{nbsp(result.firstName + " " + result.lastName)}</td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>{nbsp(result.participantState)}</td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="registerLap"
                                    onClick={(e) => this.registerLap(result.id, "COMPLETED")}>{nbsp("Godkänt varv")}</button>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="registerLap"
                                    onClick={(e) => this.registerLap(result.id, "OVERDUE")}>{nbsp("Icke godkänt varv")}</button>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="deleteLap"
                                    onClick={(e) => this.deleteLatestLap(result.id, this.getLatestLapId(result), e)}>{nbsp("Ta bort senaste varv")}</button>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="registerLap"
                                    onClick={(e) => this.changeParticipantState(result.id, "RESIGNED")}>{nbsp("Avsluta")}</button>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="registerLap"
                                    onClick={(e) => this.changeParticipantState(result.id, "ACTIVE")}>{nbsp("Aktivera")}</button>
                        </td>
                        <td style={{width: 4 + '%', textAlign: "left"}}>
                            <button value="registerLap"
                                    onClick={(e) => this.changeParticipantState(result.id, "NO_SHOW")} disabled={result.participantState === "ACTIVE"}>{nbsp("W/O")}</button>
                        </td>
                    </tr>
                )
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
                        <td>#</td><td>Namn</td><td>Status</td>
                    </tr>
                    {lapButtons}
                    </tbody>
                </table>
            </div>
        );
    }

    getLatestLapId(result) {
        console.log(result.laps)
        return Math.max.apply(Math, result.laps.map(lap => lap.number));;
    }
}

export default LapRegistrator;
