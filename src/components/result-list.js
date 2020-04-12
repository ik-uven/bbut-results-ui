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
        // this.setState({
        //     bbutResults: [
        //         {
        //             id: 2,
        //             firstName: "Torbjörn",
        //             lastName: "Grahn",
        //             laps: [
        //                 {status: "COMPLETED"},
        //                 {status: "COMPLETED"},
        //                 {status: "COMPLETED"},
        //                 {status: "COMPLETED"},
        //                 {status: "RESIGNED"}
        //             ]
        //         },
        //         {
        //             id: 1,
        //             firstName: "Ken",
        //             lastName: "Alexandersson",
        //             laps: [
        //                 {status: "COMPLETED"},
        //                 {status: "COMPLETED"},
        //                 {status: "RESIGNED"}
        //             ]
        //         }
        //     ]
        // });

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

            let content = [<td key="0"></td>];

            for (let i = 0; i < maxLap; i++) {
                content.push(<td key={i + 1} style={{width: 10}}>{i + 1}</td>)
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
                <table class="table table-bordered table-sm">
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

