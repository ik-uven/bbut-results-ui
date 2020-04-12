import React from 'react';

const ResultItem = (props) => {

    const laps = props.result.laps.map((lap) => {
        return <td class="table-success">{lap.state === "COMPLETED" ? "G" : "R"}</td>
    });

    return (
        <tr>
            <td style={{textAlign: "left"}}>{props.result.firstName} {props.result.lastName}</td>
            {laps}
        </tr>
    );
};

export default ResultItem;
