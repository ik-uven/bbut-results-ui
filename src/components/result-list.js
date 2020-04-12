import React, {Component} from "react";
import ResultItem from "./result-item";

class ResultList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bbutResults: []
        };

        this.reloadResultList = this.reloadResultList.bind(this);
    }

    reloadResultList() {

        fetch('http://localhost:8080/api/participants', {
            method: 'GET',
            mode: 'cors'
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({bbutResults: data})
                console.log(data);
            })
            .catch(console.log)
    }

    render() {
        const maxLap = Math.max.apply(Math, this.state.bbutResults.map(result => result.laps.length));

        const lapNumbers = maxLap => {

            let lapsToDraw = maxLap > 36 ? maxLap : 36;

            let content = [<td key="-1">Namn</td>, <td key="0">Team</td>];

            for (let i = 0; i < lapsToDraw; i++) {
                content.push(<td key={i + 1} style={{width: 25 + 'px'}}>{i + 1}</td>)
            }

            return content;
        };

        const resultItems = this.state.bbutResults.map((result) => {
            return (
                <ResultItem key={result.id} result={result}/>
            )
        });

        return (
            <div>
                <table className="table table-bordered table-sm">
                    <tbody>
                    <tr>
                        {lapNumbers(maxLap)}
                    </tr>
                    {resultItems}
                    </tbody>
                </table>

                <button value="refresh" onClick={this.reloadResultList}>Refresh</button>
            </div>
        );
    }
}

export default ResultList;

