import React, {Component} from "react";
import ResultItem from "./result-item";
import SockJsClient from "react-stomp";
// import getResultListMock from "./result-list-mock"

class ResultList extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
                console.log(data);
            })
            .catch(console.log)

        // this.setState({bbutResults: getResultListMock()})
    }

    getMaxLap() {
        const finalMax = 26;
        const currentMax = Math.max.apply(Math, this.state.bbutResults.map(result => result.laps.length));

        return currentMax > finalMax ? currentMax : finalMax;
    }
    //
    // connect() {
    //
    //     const socket = new SockJS('/api/live');
    //     this.stompClient = Stomp.over(socket);
    //
    //     this.stompClient.connect({}, function(frame) {
    //
    //         console.log('Connected: ' + frame);
    //         this.stompClient.subscribe('/topics/results', data => {
    //             this.setState({bbutResults: data});
    //         });
    //     });
    // }
    //
    // disconnect() {
    //
    //     if(this.stompClient != null) {
    //         this.stompClient.disconnect();
    //     }
    //
    //     console.log("Disconnected");
    // }


    render() {

        const lapNumbers = () => {

            const lapsToDraw = this.getMaxLap();

            const content = [<td key="-4">#</td>, <td key="-3">Namn</td>, <td key="-2">Team</td>, <td key="-1">Status</td>,<td key="0">Varv</td>];

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

                {/*<button value="refresh" onClick={this.reloadResultList}>Refresh</button>*/}
            </div>
        );
    }
}

export default ResultList;

