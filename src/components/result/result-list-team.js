import React, {Component} from "react";
import ResultItemTeam from "./result-item-team";
import "../compontents.css"
import BbutTable from "../bbuttable/bbut-table";

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
                    <tr className="center" key={team.name}>
                        <td>{team.name}</td>
                        <td className="right">{team.totalLaps}</td>
                    </tr>
                )
            });

        return (
            <div>


                <table className="table table-dark table-bordered table-sm w-25">
                    <tbody>
                    <tr>
                        <td className="left">Lagnamn</td>
                        <td className="left">Totalt</td>
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
