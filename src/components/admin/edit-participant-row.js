import React, {useState} from 'react'

const EditParticipantRow = (props) => {

    const [user, setUser] = useState(props.state.currentUser)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    return (
        <form onSubmit={(event) => {
            console.log(event);
            event.preventDefault()
            props.updateUser(user);
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
                    />
                </div>
                <div className="col border-right border-secondary">
                    <input
                        type="text"
                        name="team"
                        value={user.team}
                        onChange={handleInputChange}
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
                    {/*<select name="gender" value={user.gender} onChange={handleInputChange}>*/}
                    {/*    <option value="FEMALE">Kvinna</option>*/}
                    {/*    <option value="MALE">Man</option>*/}
                    {/*</select>*/}
                </div>
                <div className="col border-right border-secondary">
                    <button className="btn btn-primary btn-sm">Spara</button>
                    &nbsp;
                    <button className="btn btn-primary btn-sm" onClick={() => {
                        props.setEditing(false);

                    }}
                    >Återgå
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditParticipantRow
