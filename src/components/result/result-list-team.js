import React, {Component} from "react";
import ResultItemTeam from "./result-item-team";
import "../compontents.css"
import BbutTable from "../bbuttable/bbut-table";
import {Title} from "../title/title";

class ResultListTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clientConnected: false,
            bbutTeamResults: []
        };

        this.loadResultList = this.loadResultList.bind(this);
        this.getMaxLap = this.getMaxLap.bind(this);
    }

    componentDidMount() {
        this.loadResultList();
    }

    loadResultList() {

        fetch('/api/participants/teams')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({bbutTeamResults: data})
            })
            .catch(console.log)
    }

    getMaxLap() {
        const finalMax = 26;
        const currentMax = Math.max.apply(Math, this.state.bbutTeamResults.map(result => result.totalLaps));

        return currentMax > finalMax ? currentMax : finalMax;
    }

    render() {

        const resultItems = this.state.bbutTeamResults
            .flatMap((team) => team.participants)
            .map((participant) => {
                return (
                    <ResultItemTeam key={participant.id} participant={participant}/>
                )
            });

        const totalTeams = this.state.bbutTeamResults
            .map((team) => {
                return (
                    <tr key={team.name}>
                        <td>{team.name}</td>
                        <td className="right"><div>{team.totalLaps}</div></td>
                    </tr>
                )
            });

        const title = "Result teams " + new Date().toISOString();

        return (
            <div>
                <Title title={title} />
                <table className="team-table">
                    <tbody>
                    <tr>
                        <td>Lagnamn</td>
                        <td>Totalt</td>
                    </tr>
                    {totalTeams}
                    </tbody>
                </table>
                <hr/>
                <BbutTable headers={["Lagnamn", "#", "Namn", "Status", "Varv"]}
                           items={resultItems}
                           highestLapCount={this.getMaxLap()}/>
            </div>
        );
    }
}

export default ResultListTeam;
