import React from 'react';
import "../compontents.css"
import stateTranslator from "../text-service";

const ResultItem = (props) => {

    const stateStyle = {fontStyle: props.result.participantState !== "ACTIVE" ? "italic" : ""};

    const completedLapsCount = props.result.laps.filter((lap) => lap.state === "COMPLETED").length;

    const laps = props.result.laps.map((lap) => {
        const lapCount = props.result.laps.length;
        const classValue = lap.state === "COMPLETED" ? "lap-completed" : "lap-overdue";
        let cellContent;

        if (lap.number === lapCount && props.result.participantState === "RESIGNED") {
            cellContent = "⚑";
        }

        return <td key={lap.number} className={classValue}><div>{cellContent}</div></td>;
    });

    const getNumberOfSlotsToPad = () => {
        return props.highestLapCount - props.result.laps.length;
    };

    const padEmptySlots = () => {
        const content = [];

        for (let i = 0; i < getNumberOfSlotsToPad(); i++) {
            content.push(<td key={i} className="lap"><div>&nbsp;</div></td>)
        }

        return content;
    };

    const teamsColumn = () => {
        return props.showTeamsColumn ? <td style={stateStyle}>{props.result.team}</td> : null;
    };

    return (
        <tr>
            <td className="right">{props.result.startNumber}</td>
            <td style={stateStyle}>{props.result.firstName + " " + props.result.lastName}</td>
            <td style={stateStyle}>{props.result.club}</td>
            {teamsColumn()}
            <td style={stateStyle}>{stateTranslator(props.result.participantState)}</td>
            <td className="right">{completedLapsCount}</td>
            {laps}{padEmptySlots()}
        </tr>
    );
};

export default ResultItem;
