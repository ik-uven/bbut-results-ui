import React, {Component} from "react";
import ResultItemTeam from "./result-item-team";
import "../compontents.css"

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

        const nbsp = (string) => {
            return string !== null ? string.replace(/ /g, "\u00a0") : string;
        };

        const cellStyleR = {width: 4 + '%', textAlign: "right", whiteSpace: "nowrap"};
        const cellStyleL = {width: 4 + '%', textAlign: "left", whiteSpace: "nowrap"};

        const lapNumbers = () => {

            const lapsToDraw = this.getMaxLap();

            const content = [
                <td className="center" key="-4">Lagnamn</td>,
                <td className="center" key="-3">#</td>,
                <td className="center" key="-2">Namn</td>,
                <td className="center" key="-1">Status</td>,
                <td className="center" key="0">Varv</td>];

            for (let i = 0; i < lapsToDraw; i++) {
                content.push(<td key={i + 1} style={{width: 25 + 'px'}}>{i + 1}</td>)
            }

            return content;
        };

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
                        <td>{nbsp(team.name)}</td>
                        <td style={cellStyleR}>{team.totalLaps}</td>
                    </tr>
                )
            });

        return (
            <div>
                <table className="table table-dark table-bordered table-sm" style={cellStyleL}>
                    <tbody>
                    <tr>
                        <td className="center">Lagnamn</td>
                        <td className="center">Totalt</td>
                    </tr>
                    {totalTeams}
                    </tbody>
                </table>
                <table className="table table-dark table-bordered table-sm">
                    <tbody>
                    <tr>
                        {lapNumbers()}
                    </tr>
                    {resultItems}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResultListTeam;
