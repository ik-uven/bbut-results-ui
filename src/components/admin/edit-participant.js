import React, {useState} from "react";
import "./admin.css"
import stateTranslator, {classTranslator} from "../text-service";

const EditParticipant = (props) => {

    const [participant, setParticipant] = useState(props.participant)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setParticipant({...participant, [name]: value})
    }

    return (
        <div className="editor">
            <form onSubmitCapture={props.close} onSubmit={(event) => {
                event.preventDefault()
                props.updateParticipant(participant);
            }}
            >
                <table className="table-sm">
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
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="lastName"
                                value={participant.lastName}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="club"
                                value={participant.club !== null ? participant.club : ""}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="team"
                                value={participant.team !== null ? participant.team : ""}
                                onChange={handleInputChange}
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
                        <td>{stateTranslator(participant.participantState)}</td>
                        <td>
                            <button className="bbut-button">Spara</button>
                            &nbsp;
                            <button className="bbut-button" onClick={props.close}>Avbryt</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default EditParticipant;
