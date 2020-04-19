import React from 'react';
import './App.css';
import ResultList from "./components/result-list";
import LapRegistrator from "./components/lap-registrator";

function App() {
    return (
        <div className="App">
            <LapRegistrator/>
            <ResultList/>
        </div>
    );
}

export default App;
