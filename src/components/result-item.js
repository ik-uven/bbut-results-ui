import React from 'react';

const ResultItem = (props) => {

    const nbsp = (string) => {
        return string !== null ? string.replace(/ /g, "\u00a0") : string;
    };

    const stateTranslator = (state) => {
        let translation = state;

        switch (state) {
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

    const cellStyleR = {width : 4 + '%', textAlign: "right", fontStyle: props.result.participantState !== "ACTIVE" ? "italic" : ""};
    const cellStyleL = {width : 4 + '%', textAlign: "left", fontStyle: props.result.participantState !== "ACTIVE" ? "italic" : ""};

    const completedLapsCount = props.result.laps.filter((lap) => lap.state === "COMPLETED").length;

    const laps = props.result.laps.map((lap) => {
        const classValue = lap.state === "COMPLETED" ? "table-success" : "table-warning";
        return <td key={lap.number} className={classValue}>{" "}</td>
    });

    return (
        <tr>
            <td style={cellStyleR}>{props.result.id}</td>
            <td style={cellStyleL}>{nbsp(props.result.firstName + " " + props.result.lastName)}</td>
            <td style={cellStyleL}>{nbsp(props.result.team)}</td>
            <td style={cellStyleL}>{stateTranslator(props.result.participantState)}</td>
            <td style={cellStyleR}>{completedLapsCount}</td>
            {laps}
        </tr>
    );
};

export default ResultItem;
