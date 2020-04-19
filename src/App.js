import React from 'react';
import './App.css';
import ResultList from "./components/result-list";
import LapRegistrator from "./components/lap-registrator";
import {Route, Switch} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={ResultList} exact />
                <Route path="/admin" component={LapRegistrator} />
                <Route component={Error} />
            </Switch>
        </div>

    );
}

export default App;
