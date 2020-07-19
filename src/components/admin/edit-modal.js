import Popup from "reactjs-popup";
import EditParticipant from "./edit-participant";
import React from "react";

const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "80%",
    border: "none"
};

const EditModal = ({trigger, participant, updateParticipant}) => {
    return (
        <Popup
            modal
            overlayStyle={{background: "#282c34"}}
            contentStyle={contentStyle}
            closeOnDocumentClick={false}
            trigger={trigger}
        >
            {close => <EditParticipant
                key={participant.id !== null ? participant.id : 1}
                close={close}
                participant={participant}
                updateParticipant={updateParticipant}
            />}
        </Popup>
    );
}

export default EditModal;
