import React, { Component } from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
 
class Home extends Component {

    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container>
                        <h1>Elective Management System</h1>
                        <h2>Administrator Privileges</h2> 
                        <p>
                        This is a modified jumbotron that occupies the entire horizontal space of
                        its parent.
                        </p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}




export default Home;