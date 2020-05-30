import React from 'react';
import './App.css';
import ResultList from "./components/result-list";
import LapRegistrator from "./components/lap-registrator";
import {Route, Switch} from 'react-router-dom';
import BbutQrReader from "./components/bbut-qr-reader";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={ResultList} exact />
                <Route path="/men" render={(props) => <ResultList {...props} filterOnGender={"MALE"} />}/>
                <Route path="/women" render={(props) => <ResultList {...props} filterOnGender={"FEMALE"} />}/>
                <Route path="/admin" component={LapRegistrator} />
                <Route path="/reader" component={BbutQrReader} />
                <Route component={Error} />
            </Switch>
        </div>

    );
}

export default App;
