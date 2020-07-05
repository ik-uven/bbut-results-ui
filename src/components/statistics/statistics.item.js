import {nbsp} from "../text-service";
import React from "react";

const StatisticsItem = (props) => {

    const laps = (lapDurations) => {
        const content = [];

        lapDurations.map(lapDuration => {
            content.push(<td key={lapDuration.lapNumber}>{lapDuration.roundedInMinutes}</td>)
        });

        return content;
    };

    const getNumberOfSlotsToPad = () => {
        return props.highestLapCount - props.statistic.lapDurations.length;
    };

    const padEmptySlots = () => {
        const content = [];

        for (let i = 0; i < getNumberOfSlotsToPad(); i++) {
            content.push(<td key={i}>{" "}</td>)
        }

        return content;
    };

    return (
        <tr>
            <td className="right">{props.statistic.participantId}</td>
            <td>{nbsp(props.statistic.firstName + " " + props.statistic.lastName)}</td>
            <td>{nbsp(props.statistic.club)}</td>
            {props.showTeamsColumn ? <td>{nbsp(props.statistic.team)}</td> : null}
            <td>{props.statistic.averageLapInMinutes}</td>
            {laps(props.statistic.lapDurations)}{padEmptySlots()}
        </tr>
    );
};

export default StatisticsItem;
