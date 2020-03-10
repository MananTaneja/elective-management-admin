import React, { Component } from 'react';
import {ButtonToolbar, ButtonGroup, Button, Jumbotron, ProgressBar} from 'react-bootstrap';

class Actions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            now: 50
        };
        this.updateProgress = this.updateProgress.bind(this);
    }
    
    updateProgress() {
        if(this.state.now <= 80) {
           const temp = this.state.now + 20;
           this.setState({
               now: temp
           });
        }
        else {
            this.setState({
                now: 0
            });
        }
    }

    render() {
        return (
            <div className="col-md-12"> 
                <Jumbotron>
                    <ProgressBar animated variant="danger" now={this.state.now} />
                    <ButtonToolbar aria-label="Toolbar with Button groups" className="justify-content-between">
                        <ButtonGroup className="mr-2" aria-label="First group" size="lg">
                        <Button style = {{padding: "3vw", margin: "1vw", width: "20vw" }} variant="success" onClick={this.updateProgress}>Step 1: Allot Electivies</Button>{' '}
                        <Button style = {{padding: "3vw", margin: "1vw", width: "20vw" }} variant="secondary">Step 2: Generate Mailing List</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <br />
                    <br />
                    <ButtonToolbar
                        className="justify-content-between"
                        aria-label="Toolbar with Button groups"
                    >
                        <ButtonGroup aria-label="First group" size="lg">
                        <Button style = {{padding: "3vw", margin: "1vw", width: "20vw" }} variant="secondary">Step 3: Send mail</Button>{' '}
                        <Button style = {{padding: "3vw", margin: "1vw", width: "20vw" }} variant="success">Step 4: Allot Classrooms</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Jumbotron>
            </div>
        )
    }


}

export default Actions;
