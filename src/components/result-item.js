import React from 'react';

const ResultItem = (props) => {

    const nbsp = (string) => {
        return string !== null ? string.replace(/ /g, "\u00a0") : string;
    }

    const cellStyle = {width : 20 + '%', textAlign: "left"};

    const laps = props.result.laps.map((lap) => {
        const classValue = lap.state === "COMPLETED" ? "table-success" : "table-danger"
        return <td key={lap.number} className={classValue}>{" "}</td>
    });

    return (
        <tr>
            <td style={cellStyle}>{nbsp(props.result.firstName + " " + props.result.lastName)}</td>
            <td style={cellStyle}>{nbsp(props.result.team)}</td>
            {laps}
        </tr>
    );
};

export default ResultItem;
