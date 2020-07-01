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

    const stateStyle = {fontStyle: props.participant.participantState !== "ACTIVE" ? "italic" : ""};

    const completedLapsCount = props.participant.laps.filter((lap) => lap.state === "COMPLETED").length;

    const laps = props.participant.laps.map((lap) => {
        const classValue = lap.state === "COMPLETED" ? "table-success" : "table-warning";
        return <td key={lap.number} className={classValue}>{" "}</td>
    });

    return (
        <tr>
            <td style={stateStyle}>{nbsp(props.participant.team)}</td>
            <td className="right">{props.participant.id}</td>
            <td style={stateStyle}>{nbsp(props.participant.firstName + " " + props.participant.lastName)}</td>
            <td style={stateStyle}>{stateTranslator(props.participant.participantState)}</td>
            <td className="right">{completedLapsCount}</td>
            {laps}
        </tr>
    );
};

export default ResultItemTeam;
