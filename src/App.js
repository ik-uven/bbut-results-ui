import React from 'react';
import './App.css';
import ResultList from "./components/result/result-list";
import LapRegistrator from "./components/registrator/lap-registrator";
import BbutQrReader from "./components/bbut-qr-reader";
import ResultListTeam from "./components/result/result-list-team";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ParticipantAdminList from "./components/admin/participant-admin-list";
import StatisticsList from "./components/statistics/statistics-list";
import StatisticsParticipantsCompletedLaps from "./components/statistics/statistics-participants-completed-laps";
import Demographics from "./components/statistics/demographics/demographics";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/results"/>
                    </Route>
                    <Route path="/results/teams" exact component={ResultListTeam}/>
                    <Route exact path={["/results", "/results/:id"]} component={ResultList}/>
                    <Route path="/registrator" component={LapRegistrator}/>
                    <Route path="/admin" component={ParticipantAdminList}/>
                    <Route path="/reader" component={BbutQrReader}/>
                    <Route path="/statistics" exact component={StatisticsList}/>
                    <Route path="/statistics/completedlaps" exact component={StatisticsParticipantsCompletedLaps}/>
                    <Route path="/statistics/demographics" exact component={Demographics}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
