import React, {Component} from "react";
import ResultItemTeam from "./result-item-team";
import "../compontents.css"
import BbutTable from "../bbuttable/bbut-table";
import {Title} from "../title/title";
import moment from "moment-timezone";

const defaultState = {
    clientConnected: false,
    teamDtos: [],
    teamMinSize: 0,
    fetchTime: "",
    loadComplete: false
};

class ResultListTeam extends Component {

    constructor(props) {
        super(props);

        this.state = defaultState;

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
                this.setState({
                    teamDtos: data.teamDtos,
                    teamMinSize: data.teamMinSize,
                    fetchTime: this.getTime(),
                    loadComplete: true
                })
            })
            .catch(console.log)
    }

    getTime() {
        return moment().tz("Europe/Stockholm").format("YYYY-MM-DD hh:mm");
    }

    getMaxLap() {
        const finalMax = 26;
        const currentMax = Math.max.apply(Math, this.state.teamDtos.map(result => result.totalLaps));

        return currentMax > finalMax ? currentMax : finalMax;
    }

    render() {
        if (!this.state.loadComplete) {
            return <div></div>
        }

        if (!this.state.teamDtos || this.state.teamDtos.length < 1) {
            return <div className="white">Lagresultat visas endast om det finns lag med {this.state.teamMinSize} eller fler deltagare</div>
        }

        const resultItems = this.state.teamDtos
            .flatMap((team) => team.participants)
            .map((participant) => {
                return (
                    <ResultItemTeam key={participant.id} participant={participant}/>
                )
            });

        const totalTeams = this.state.teamDtos
            .map((team) => {
                return (
                    <tr key={team.name}>
                        <td>{team.name}</td>
                        <td className="right"><div>{team.totalLaps}</div></td>
                    </tr>
                )
            });

        const title = "Result teams " + this.state.fetchTime;

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
