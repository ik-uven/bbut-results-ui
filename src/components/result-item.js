import React from 'react';

const ResultItem = (props) => {

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

    const cellStyleR = {width : 4 + '%', textAlign: "right", whiteSpace: "nowrap", fontStyle: props.result.participantState !== "ACTIVE" ? "italic" : ""};
    const cellStyleL = {width : 4 + '%', textAlign: "left", whiteSpace: "nowrap", fontStyle: props.result.participantState !== "ACTIVE" ? "italic" : ""};

    const completedLapsCount = props.result.laps.filter((lap) => lap.state === "COMPLETED").length;

    const laps = props.result.laps.map((lap) => {
        const lapCount = props.result.laps.length;
        const classValue = lap.state === "COMPLETED" ? "lap-completed" : "lap-overdue";
        let cellContent;

        if (lap.number === lapCount && props.result.participantState === "RESIGNED") {
            //cellContent = "\u2736";
            //cellContent = "👣";
            //cellContent = "🏁";
            cellContent = "⚑";
        }

        return <td key={lap.number} className={classValue}>{cellContent}</td>;
    });

    const getNumberOfSlotsToPad = () => {
        return props.highestLapCount - props.result.laps.length;
    };

    const padEmptySlots = () => {
        const content = [];

        for (let i = 0; i < getNumberOfSlotsToPad(); i++) {
            content.push(<td key={i}>{" "}</td>)
        }

        return content;
    };

    const teamsColumn = () => {
        return props.showTeamsColumn ? <td style={cellStyleL}>{nbsp(props.result.team)}</td> : null;
    };

    return (
        <tr>
            <td style={cellStyleR}>{props.result.id}</td>
            <td style={cellStyleL}>{nbsp(props.result.firstName + " " + props.result.lastName)}</td>
            <td style={cellStyleL}>{nbsp(props.result.club)}</td>
            {teamsColumn()}
            <td style={cellStyleL}>{stateTranslator(props.result.participantState)}</td>
            <td style={cellStyleR}>{completedLapsCount}</td>
            {laps}{padEmptySlots()}
        </tr>
    );
};

export default ResultItem;
