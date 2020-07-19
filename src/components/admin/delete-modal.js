import Popup from "reactjs-popup";
import React from "react";
import "./admin.css"

const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "80%",
    border: "none"
};

const DeleteModal = ({trigger, participant, deleteRow}) => {
    return (
        <Popup
            modal
            overlayStyle={{background: "#282c34"}}
            contentStyle={contentStyle}
            closeOnDocumentClick={false}
            trigger={trigger}
        >
            {close => {
                return (
                    <div className="delete">
                        <div>Ta bort ({participant.id}) {participant.firstName + " " + participant.lastName}?</div>
                        <div className="buttons">
                            <button className="btn btn-danger btn-sm" onClick={() => deleteRow(participant.id)}>Ta bort
                            </button>
                            &nbsp;
                            <button className="btn btn-primary btn-sm"
                                    onClick={close}>Avbryt
                            </button>
                        </div>
                    </div>
                );
            }}
        </Popup>
    );
};

export default DeleteModal;
