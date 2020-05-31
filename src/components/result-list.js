import React, {Component} from "react";
import ResultItem from "./result-item";
import SockJsClient from "react-stomp";

class ResultList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: props.match.params.id,
            clientConnected: false,
            bbutResults: []
        };

        this.loadResultList = this.loadResultList.bind(this);
        this.getMaxLap = this.getMaxLap.bind(this);
    }

    componentDidMount() {
        this.loadResultList();
    }

    loadResultList() {

        fetch('/api/participants')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({bbutResults: data})
            })
            .catch(console.log)
    }

    getMaxLap() {
        const finalMax = 26;
        const currentMax = Math.max.apply(Math, this.state.bbutResults.map(result => result.laps.length));

        return currentMax > finalMax ? currentMax : finalMax;
    }

    render() {

        const lapNumbers = () => {

            const lapsToDraw = this.getMaxLap();

            const content = [<td key="-5">#</td>, <td key="-4">Namn</td>, <td key="-3">Klubb</td>, <td key="-2">Lagnamn</td>, <td key="-1">Status</td>,<td key="0">Varv</td>];

            for (let i = 0; i < lapsToDraw; i++) {
                content.push(<td key={i + 1} style={{width: 25 + 'px'}}>{i + 1}</td>)
            }

            return content;
        };

        const resultItems = this.state.bbutResults
            .filter(this.onGender())
            .map((result) => {
            return (
                <ResultItem key={result.id} result={result}/>
            )
        });

        return (
            <div>
                <SockJsClient url={ "/api/live" } topics={["/topics/results"]}
                              onMessage={ (data) => this.setState({bbutResults: data}) } ref={ (client) => { this.clientRef = client }}
                              onConnect={ () => { this.setState({ clientConnected: true }) } }
                              onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                              debug={ true }/>

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

    onGender() {
        return (result) => {
            if (this.state.type === "men" || this.state.type === "women") {
                const filterValue = this.state.type === "women" ? "FEMALE" : "MALE";
                return result.gender === filterValue;
            } else {
                return result.id > 0;
            }
        };
    }
}

export default ResultList;

