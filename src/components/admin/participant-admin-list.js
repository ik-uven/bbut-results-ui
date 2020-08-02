import React, {Component} from 'react'
import stateTranslator, {classTranslator} from "../text-service";
import "../compontents.css"
import EditModal from "./edit-modal";
import DeleteModal from "./delete-modal";
import {Title} from "../title/title";

const defaultCurrentParticipant = {id: null, firstName: "", lastName: "", club: "", team: "", participantClass: "MEN"};

class ParticipantAdminList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            participants: [],
            deleteConfirmation: {
                show: false,
                id: null
            }
        };

        this.loadParticipantList = this.loadParticipantList.bind(this);
    }

    componentDidMount() {
        this.loadParticipantList();
    }

    loadParticipantList() {

        fetch('/api/admin/participants')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({participants: data})
            })
            .catch(console.log)
    }

    changeParticipant(id, participant) {

        const endPoint = id !== null ? {method: "PUT", url: "/api/admin/participants/" + id} : {
            method: "POST",
            url: "/api/admin/participants/"
        };

        fetch(endPoint.url, {
            method: endPoint.method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(participant)
        })
            .then(response => {
                return response.json()
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

    showDeleteConfirmation(show, id) {
        this.setState({deleteConfirmation: {show: show, id: id}})
    }

    deleteParticipant(id) {
        fetch('/api/admin/participants/' + id, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status === 200) {
                    let copy = this.state.participants.filter(participant => participant.id !== id);
                    this.setState({participants: copy})
                }
            })
            .catch(console.log);
    }

    refresh(id, data) {
        let copy = Array.from(this.state.participants);

        const currentMaxId = Math.max.apply(Math, copy.map(participant => participant.id));

        if (currentMaxId < data.id) {
            copy.push(data);
            this.setState({participants: copy});
        } else {
            this.setState({participants: copy.map((participant) => (participant.id === id ? data : participant))});
        }
    }

    render() {

        const updateParticipant = (participant) => {
            this.changeParticipant(participant.id, participant);
        };

        const deleteRow = (id) => {
            this.deleteParticipant(id);
        };

        const statusButtons = (participant) => {
            const hasRegisteredLaps = participant.laps.length > 0;

            return (
                <div>
                    <button value="activate"
                            disabled={participant.participantState === "ACTIVE"}
                            className={participant.participantState === "ACTIVE" ? "bbut-button button-success" : "bbut-button button"}
                            onClick={(e) => this.changeParticipantState(participant.id, "ACTIVE")}>{stateTranslator("ACTIVE")}
                    </button>
                    &nbsp;
                    <button value="resign"
                            disabled={participant.participantState === "RESIGNED"}
                            className={participant.participantState === "RESIGNED" ? "bbut-button button-warning" : "bbut-button button"}
                            onClick={(e) => this.changeParticipantState(participant.id, "RESIGNED")}>{stateTranslator("RESIGNED")}
                    </button>
                    &nbsp;
                    <button value="noShow"
                            disabled={participant.participantState === "NO_SHOW" || hasRegisteredLaps}
                            className={participant.participantState === "NO_SHOW" ? "bbut-button button-warning" : "bbut-button button"}
                            onClick={(e) => this.changeParticipantState(participant.id, "NO_SHOW")}>{stateTranslator("NO_SHOW")}
                    </button>
                    &nbsp;
                    <button value="registered"
                            disabled={participant.participantState === "REGISTERED" || hasRegisteredLaps}
                            className={participant.participantState === "REGISTERED" ? "bbut-button button-warning" : "bbut-button button"}
                            onClick={(e) => this.changeParticipantState(participant.id, "REGISTERED")}>{stateTranslator("REGISTERED")}
                    </button>
                </div>
            );
        };

        const actionButtons = (participant) => {

            return (
                <td>
                    <EditModal
                        trigger={open => <button onClick={open} className="bbut-button button">Ändra</button>}
                        participant={participant}
                        updateParticipant={updateParticipant}/>
                    &nbsp;
                    <DeleteModal
                        trigger={open =>
                            <button
                                className="bbut-button button"
                                disabled={participant.participantState !== "REGISTERED"}
                                onClick={open}>Ta bort</button>
                        }
                        participant={participant}
                        deleteRow={deleteRow}/>

                </td>
            );
        };

        return (
            <div>
                <Title title="Administration"/>
                <table className="table table-dark table-bordered table-sm">
                    <tbody>
                    <tr>
                        <td className="center">#</td>
                        <td className="center">Förnamn</td>
                        <td className="center">Efternamn</td>
                        <td className="center">Klubb</td>
                        <td className="center">Lagnamn</td>
                        <td className="center">Klass</td>
                        <td className="center">Status</td>
                        <td>
                            <EditModal
                                trigger={open => <button className="bbut-button button"
                                                         onClick={open}>Ny...</button>}
                                participant={defaultCurrentParticipant}
                                updateParticipant={updateParticipant}/>
                        </td>
                    </tr>

                    {this.state.participants.length > 0 ? (
                        this.state.participants.map((participant) =>
                            <tr key={participant.id}>
                                <td>{participant.id}</td>
                                <td>{participant.firstName}</td>
                                <td>{participant.lastName}</td>
                                <td>{participant.club}</td>
                                <td>{participant.team}</td>
                                <td>{classTranslator(participant.participantClass)}</td>
                                <td className="center">{statusButtons(participant)}</td>
                                {actionButtons(participant)}
                            </tr>
                        )
                    ) : (
                        <tr>
                            <td>No users</td>
                        </tr>
                    )}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default ParticipantAdminList
