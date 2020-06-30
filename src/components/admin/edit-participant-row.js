import React, {useState} from 'react'

const EditParticipantRow = (props) => {

    const [user, setUser] = useState(props.state.currentUser)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            props.updateUser(user);
            props.setEditing(false);
        }}
        >
            <div className="form-row table-dark border-top border-secondary text-left" key={user.id}>
                <div className="col border-right border-secondary">
                    {user.id}
                </div>
                <div className="col border-right border-secondary">
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                    />
                </div>
                <div className="col border-right border-secondary">
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                    />
                </div>
                <div className="col border-right border-secondary">
                    <input
                        type="text"
                        name="club"
                        value={user.club}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                    />
                </div>
                <div className="col border-right border-secondary">
                    <input
                        type="text"
                        name="team"
                        value={user.team}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                    />
                </div>
                <div className="col border-right border-secondary">
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
                            Kvinna
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
                            Man
                        </label>
                    </div>
                </div>
                <div className="col border-right border-secondary">{user.participantState}</div>
                <div className="col border-right border-secondary">
                    <button className="btn btn-primary btn-sm">Spara</button>
                    &nbsp;
                    <button className="btn btn-primary btn-sm" onClick={() => {
                        props.setEditing(false);
                    }}
                    >Avbryt
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditParticipantRow
