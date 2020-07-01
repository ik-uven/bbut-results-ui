import React, {Component} from 'react'
import EditParticipantRow from "./edit-participant-row";
import "../compontents.css"

const defaultCurrentUser = {id: null, firstName: "", lastName: "", club: "", team: "", gender: "MALE"};

class ParticipantAdminList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            participants: [],
            editing: false,
            currentUser: defaultCurrentUser,
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

        const endPoint = id !== null ? ["PUT", "/api/admin/participants/" + id] : ["POST", "/api/admin/participants/"];

        fetch(endPoint[1], {
            method: endPoint[0],
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(participant)
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
        let copy = JSON.parse(JSON.stringify(this.state.participants))

        const currentMaxId = Math.max.apply(Math, copy.map(participant => participant.id));

        if (currentMaxId < data.id) {
            copy.push(data);
            this.setState({participants: copy});
        } else {
            this.setState({participants: copy.map((participant) => (participant.id === id ? data : participant))});
        }
    }

    render() {

        const nbsp = (string) => {
            return string !== null ? string.replace(/ /g, "\u00a0") : string;
        };

        const stateTranslator = (participantState) => {
            let translation = participantState;

            switch (participantState) {
                case "REGISTERED":
                    translation = "Anmäld";
                    break;
                case "ACTIVE":
                    translation = "Aktiv";
                    break;
                case "RESIGNED":
                    translation = "Avslutat";
                    break;
                case "NO_SHOW":
                    translation = nbsp("Ej start");
                    break;
                default:
                    break;
            }

            return translation;
        };

        const updateUser = (updatedParticipant) => {
            this.setState({editing: false});
            this.changeParticipant(updatedParticipant.id, updatedParticipant);
        };

        const setEditing = (editing) => {
            this.setState({editing: editing});
            if (!editing) {
                this.setState({currentUser: defaultCurrentUser})
            }
        };

        const createRow = () => {
            this.setState({editing: true})
        };

        const editRow = (participant) => {
            this.setState({editing: true})
            this.setState({
                currentUser: {
                    id: participant.id,
                    firstName: participant.firstName,
                    lastName: participant.lastName,
                    club: participant.club,
                    team: participant.team,
                    gender: participant.gender,
                    participantState: stateTranslator(participant.participantState)
                }
            })
        };

        const deleteRow = (id) => {
            this.deleteParticipant(id);
            this.showDeleteConfirmation(false);
        };

        const actionButtons = (participant) => {
            if (this.state.deleteConfirmation.show && this.state.deleteConfirmation.id === participant.id) {
                return (
                    <td>
                        <div>Ta bort<br/>{participant.firstName + " " + participant.lastName}?</div>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteRow(participant.id)}>Ta bort
                        </button>
                        &nbsp;
                        <button className="btn btn-primary btn-sm" onClick={() => this.showDeleteConfirmation(false)}>Avbryt</button>
                    </td>
                );

            } else {
                return (
                    <td>
                        <button className="btn btn-primary btn-sm" onClick={() => editRow(participant)}>Ändra
                        </button>
                        &nbsp;
                        <button
                            className="btn btn-primary btn-sm"
                            disabled={participant.participantState !== "REGISTERED"}
                            onClick={() => this.showDeleteConfirmation(true, participant.id)}>Ta bort</button>
                    </td>
                );
            }
        };

        return (
            <table className="table table-dark table-bordered table-sm">
                <tbody>
                <tr>
                    <td className="center">#</td>
                    <td className="center">Förnamn</td>
                    <td className="center">Efternamn</td>
                    <td className="center">Klubb</td>
                    <td className="center">Lagnamn</td>
                    <td className="center">Kön</td>
                    <td className="center">Status</td>
                    <td><button className="btn btn-primary btn-sm" onClick={createRow}>Ny...</button></td>
                </tr>

                {this.state.participants.length > 0 ? (
                    this.state.editing === true && this.state.currentUser.id === null ? (
                        <EditParticipantRow
                            key={1}
                            state={this.state}
                            updateUser={updateUser}
                            setEditing={setEditing}
                        />
                    ) : (
                    this.state.participants.map((participant) => this.state.editing === true
                        && participant.id === this.state.currentUser.id ?
                        <EditParticipantRow
                            key={participant.id}
                            state={this.state}
                            updateUser={updateUser}
                            setEditing={setEditing}
                        /> :
                        <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td>{participant.firstName}</td>
                            <td>{participant.lastName}</td>
                            <td>{participant.club}</td>
                            <td>{participant.team}</td>
                            <td>{participant.gender === "FEMALE" ? "Kvinna" : "Man"}</td>
                            <td>{stateTranslator(participant.participantState)}</td>
                            {actionButtons(participant)}
                        </tr>
                    ))
                ) : (
                    <div>
                        No users
                    </div>
                )}

                </tbody>
            </table>
        );
    }
}

export default ParticipantAdminList
