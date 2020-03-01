import React, { Component } from 'react';
import Database from './Database';
import Electives from './Electives';
import {Nav, Navbar, Form, Button } from 'react-bootstrap';
import fire from '../config/Fire';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        return(
            <div>
                <Router>
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand href="#">Admin</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Navbar.Brand>
                                <Link to="/database" className="text-white">Database</Link>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link to="/elective" className="text-white">Electives</Link>
                            </Navbar.Brand>
                        </Nav>
                        <Form inline>
                            <Button className="btn btn-outline-primary my-2 my-sm-0" onClick={this.logout}>Logout</Button>
                        </Form>
                    </Navbar>
                    <Switch>
                        <Route path="/database">
                            <Database />
                        </Route>
                        <Route path="/elective">
                            <Electives />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default NavBar;