import React, {useState} from 'react'
import "../compontents.css"
import {classTranslator} from "../text-service";

const EditParticipantRow = (props) => {

    console.log(props.state.currentParticipant)

    const [participant, setParticipant] = useState(props.state.currentParticipant)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setParticipant({...participant, [name]: value})
    }

    return (
        <tr>
            <td colSpan={8}>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    props.updateParticipant(participant);
                    props.setEditing(false);
                }}
                >
                    <table className="table-sm" style={{width: "100%"}}>
                        <tbody>
                        <tr>
                            <td>#</td>
                            <td>Förnamn</td>
                            <td>Efternamn</td>
                            <td>Klubb</td>
                            <td>Lagnamn</td>
                            <td>Klass</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                        <tr key={participant.id}>
                            <td>
                                {participant.id}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={participant.firstName}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={participant.lastName}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="club"
                                    value={participant.club !== null ? participant.club : ""}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="team"
                                    value={participant.team !== null ? participant.team : ""}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                />
                            </td>
                            <td>
                                <div className="form-check">
                                    <label>
                                        <input
                                            type="radio"
                                            name="participantClass"
                                            value="WOMEN"
                                            checked={participant.participantClass === "WOMEN"}
                                            onChange={handleInputChange}
                                            className="form-check-input"
                                        />
                                        {classTranslator("WOMEN")}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                        <input
                                            type="radio"
                                            name="participantClass"
                                            value="MEN"
                                            checked={participant.participantClass === "MEN"}
                                            onChange={handleInputChange}
                                            className="form-check-input"
                                        />
                                        {classTranslator("MEN")}
                                    </label>
                                </div>
                            </td>
                            <td>{participant.participantState}</td>
                            <td>
                                <button className="btn btn-primary btn-sm">Spara</button>
                                &nbsp;
                                <button className="btn btn-primary btn-sm" onClick={() => {
                                    props.setEditing(false);
                                }}
                                >Avbryt
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </td>
        </tr>
    )
}

export default EditParticipantRow
