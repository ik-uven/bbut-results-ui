import React, {useState} from 'react'
import "../compontents.css"
import {genderTranslator} from "../text-service";

const EditParticipantRow = (props) => {

    const [user, setUser] = useState(props.state.currentUser)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    return (
        <tr>
            <td colSpan={8}>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    props.updateUser(user);
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
                            <td>Kön</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                        <tr key={user.id}>
                            <tr>
                                {user.id}
                            </tr>
                            <td>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="club"
                                    value={user.club}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="team"
                                    value={user.team}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                />
                            </td>
                            <td>
                                <div className="form-check">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="FEMALE"
                                            checked={user.gender === "FEMALE"}
                                            onChange={handleInputChange}
                                            className="form-check-input"
                                        />
                                        {genderTranslator("FEMALE")}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="MALE"
                                            checked={user.gender === "MALE"}
                                            onChange={handleInputChange}
                                            className="form-check-input"
                                        />
                                        {genderTranslator("MALE")}
                                    </label>
                                </div>
                            </td>
                            <td>{user.participantState}</td>
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
