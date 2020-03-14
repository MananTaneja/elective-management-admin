import React, { Component } from 'react';
import Transactions from './Transactions';
import {Jumbotron, Container, Button} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
 
class Home extends Component {

    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container>
                        <h1>Elective Management System</h1>
                        <h2>Administrator Privileges</h2> 
                        <Router>
                            <p>
                                <Link to="/transactions" className="btn btn-primary">View Transactions</Link>
                            </p>
                            <Switch>
                                <Route path="/transactions">
                                    <Transactions />
                                </Route>
                            </Switch>    
                        </Router>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}




export default Home;