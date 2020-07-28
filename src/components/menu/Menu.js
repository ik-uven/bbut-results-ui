import React from "react";
import {NavLink} from "react-router-dom";
import "./menu.css"

export default ({ close }) => (
    <div className="menu">
        <ul>
            <li>
                <NavLink exact onClick={close} activeClassName="current" to="/results">
                    Resultat
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/results/women">
                    Damer
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/results/men">
                    Herrar
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/results/teams">
                    Lag
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
                    Burndown chart
                </NavLink>
            </li>
            <li className="submenu">
                <NavLink exact onClick={close} activeClassName="current" to="/statistics/demographics">
                    Demografi
                </NavLink>
            </li>
        </ul>
    </div>
);
