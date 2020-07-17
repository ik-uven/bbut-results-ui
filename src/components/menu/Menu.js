import React from "react";
import {NavLink} from "react-router-dom";

export default ({ close }) => (
    <div className="menu">
        <ul>
            <li>
                <NavLink exact onClick={close} activeClassName="current" to="/results">
                    Resultat (leaderboard)
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/results/women">
                    Resultat Damer
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/results/men">
                    Resultat Herrar
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/results/teams">
                    Resultat Lag
                </NavLink>
            </li>
            <li>
                <NavLink onClick={close} activeClassName="current" to="/registrator">
                    Varvregistrering
                </NavLink>
            </li>
            <li>
                <NavLink onClick={close} activeClassName="current" to="/admin">
                    Administration
                </NavLink>
            </li>
            <li>
                <NavLink exact onClick={close} activeClassName="current" to="/statistics">
                    Statistik varvtid
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/statistics/completedlaps">
                    Statistik burndown chart
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/statistics/demographics">
                    Statistik demografi
                </NavLink>
            </li>
        </ul>
    </div>
);
