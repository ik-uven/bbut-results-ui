import React from 'react';

const ResultItem = (props) => {

    const nbsp = (string) => {
        return string !== null ? string.replace(/ /g, "\u00a0") : string;
    }

    const cellStyleR = {width : 4 + '%', textAlign: "right"};
    const cellStyleL = {width : 4 + '%', textAlign: "left"};

    const laps = props.result.laps.map((lap) => {
        const classValue = lap.state === "COMPLETED" ? "table-success" : "table-danger"
        return <td key={lap.number} className={classValue}>{" "}</td>
    });

    return (
        <tr>
            <td style={cellStyleR}>{props.result.id}</td>
            <td style={cellStyleL}>{nbsp(props.result.firstName + " " + props.result.lastName)}</td>
            <td style={cellStyleL}>{nbsp(props.result.team)}</td>
            <td style={cellStyleL}>{nbsp(props.result.participantState)}</td>
            {laps}
        </tr>
    );
};

export default ResultItem;
