import React from "react";

const BbutTable = (props) => {

    const headers = () => {

        const lapsToDraw = props.highestLapCount;

        const content = [];
        for (let i = 0; i < props.headers.length; i++) {
            content.push(<td className="center" key={-i}>{props.headers[i]}</td>);
        }

        for (let i = 0; i < lapsToDraw; i++) {
            const lapNumber = i + 1;

            let lapNumberString;

            // Add some space before numbers below 10 and for number 11
            if (lapNumber < 10) {
                lapNumberString = "\u00a0\u00a0" + lapNumber
            } else if (lapNumber === 11) {
                lapNumberString = "\u00a0" + lapNumber;
            } else {
                lapNumberString = lapNumber;
            }

            content.push(<td key={lapNumber} className="lap"><div>{lapNumberString}</div></td>);
        }

        return content;
    };

    return (
        <table className="lap-table">
            <tbody>
            <tr>
                {headers()}
            </tr>
            {props.items}
            </tbody>
        </table>
    );
};

export default BbutTable;
