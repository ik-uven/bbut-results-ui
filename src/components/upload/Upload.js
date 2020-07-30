import React, {Component} from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import {NavLink} from "react-router-dom";

const defaultState = {
    files: [],
    uploading: false,
    successfullyUploaded: false,
    uploadResult: [],
    errorResult: null
};

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.upload = this.upload.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    onFilesAdded(files) {
        this.setState({
            files: this.state.files.concat(files)
        });
    }

    upload() {

        this.setState({uploading: true});

        const formData = new FormData();
        formData.append('file', this.state.files[0]);

        fetch('/api/participants/imports', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(json => {
                        throw new Error(json.messages ? json.messages[0] : json.message)
                    })
                }
            })
            .then(data => {
                this.setState({files: [], successfullyUploaded: true, uploading: false, uploadResult: data});
            })
            .catch(error => {
                this.setState({errorResult: error, successfullyUploaded: false, uploading: false});
            });
    };

    showUploadResult() {
        if (this.state.uploadResult.length > 0) {
            return (
                <span className="Success">{this.state.uploadResult.length} deltagare importerade</span>
            );
        }
    }

    showErrorResult() {
        if (this.state.errorResult) {
            return (
                <span className="Error">{this.state.errorResult.toString()}</span>
            );
        }
    }

    renderActions() {
        if (this.state.successfullyUploaded) {
            return (
                <NavLink to="/admin">
                    Administration
                </NavLink>
            );
        } else {
            return (
                <button
                    disabled={this.state.files.length === 0 || this.state.uploading || this.state.errorResult}
                    onClick={this.upload}
                >
                    Importera
                </button>
            );
        }
    }

    render() {
        return (
            <div className="imports-container">
                <div className="Card">
                    <div className="Upload">
                        <span className="Title">Importera deltagare</span>
                        <div className="Content">
                            <div onClick={() => this.setState(defaultState)}>
                                <Dropzone
                                    onFilesAdded={this.onFilesAdded}
                                    disabled={this.state.uploading}
                                />
                            </div>
                            <div className="Files">
                                {this.state.files.map(file => {
                                    return (
                                        <div key={file.name} className="Row">
                                            <span className="Filename">{file.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="Message">{this.showUploadResult()}{this.showErrorResult()}</div>
                        <div className="Actions">{this.renderActions()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;
