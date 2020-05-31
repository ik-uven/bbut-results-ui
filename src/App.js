import React from 'react';
import './App.css';
import ResultList from "./components/result-list";
import LapRegistrator from "./components/lap-registrator";
import BbutQrReader from "./components/bbut-qr-reader";
import ResultListTeam from "./components/result-list-team";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

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
                    <Route path="/admin" component={LapRegistrator}/>
                    <Route path="/reader" component={BbutQrReader}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
