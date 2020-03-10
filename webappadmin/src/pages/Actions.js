import React, { Component } from 'react';
import {ButtonToolbar, ButtonGroup, Button, Jumbotron, Row, Col} from 'react-bootstrap';

class Actions extends Component {
    
    render() {
        return (
            <div className="col-md-12"> 
                <Jumbotron>
                    <ButtonToolbar aria-label="Toolbar with Button groups" className="justify-content-between">
                        <ButtonGroup className="mr-2" aria-label="First group" size="lg">
                        <Button style = {{padding: "3vw", margin: "1vw", width: "20vw" }} variant="success">Step 1: Allot Electivies</Button>{' '}
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
