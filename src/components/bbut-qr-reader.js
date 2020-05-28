import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class BbutQrReader extends Component {

    state = {
        eventId: 1,
        startNumber: 0
    }

    handleScan = data => {
        if (data) {
            const input = JSON.parse(data)

            this.setState({
                eventId: input.eventId,
                startNumber: input.startNumber
            });

            this.registerLap(this.state.startNumber, "COMPLETED")
        }
    }

    handleError = err => {
        console.error(err)
    }

    registerLap(id, lapState) {
        fetch('/api/participants/' + id + '/laps', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                registrationTime: "2020-08-08T12:53:00",
                lapState: lapState
            })
        })
            .then(response => console.log(response.status))
            .catch(console.log);
    };

    render() {
        return (
            <div>
                <QrReader
                    delay={2000}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <p>{this.state.startNumber}</p>
            </div>
        )
    }
}

export default BbutQrReader;
