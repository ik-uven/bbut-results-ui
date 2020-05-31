import React from 'react';

const ResultItemTeam = (props) => {

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

    const cellStyleR = {width : 4 + '%', textAlign: "right", whiteSpace: "nowrap", fontStyle: props.participant.participantState !== "ACTIVE" ? "italic" : ""};
    const cellStyleL = {width : 4 + '%', textAlign: "left", whiteSpace: "nowrap", fontStyle: props.participant.participantState !== "ACTIVE" ? "italic" : ""};

    const completedLapsCount = props.participant.laps.filter((lap) => lap.state === "COMPLETED").length;

    const laps = props.participant.laps.map((lap) => {
        const classValue = lap.state === "COMPLETED" ? "table-success" : "table-warning";
        return <td key={lap.number} className={classValue}>{" "}</td>
    });

    return (
        <tr>
            <td style={cellStyleL}>{nbsp(props.participant.team)}</td>
            <td style={cellStyleR}>{props.participant.id}</td>
            <td style={cellStyleL}>{nbsp(props.participant.firstName + " " + props.participant.lastName)}</td>
            <td style={cellStyleL}>{stateTranslator(props.participant.participantState)}</td>
            <td style={cellStyleR}>{completedLapsCount}</td>
            {laps}
        </tr>
    );
};

export default ResultItemTeam;
