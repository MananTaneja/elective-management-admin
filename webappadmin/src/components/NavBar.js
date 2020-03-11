import React, { Component } from 'react';
import Faculty from '../pages/Faculty.js';
import Electives from '../pages/Electives'
import Student from '../pages/Student';
import Actions from '../pages/Actions';
import Home from '../pages/Home';
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
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>
                            <Link to="/"><img src="https://img.icons8.com/cute-clipart/25/000000/home-page.png"/></Link>
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                            <Navbar.Brand>
                                <Link className="text-white" to="/faculty">Faculty</Link>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link className="text-white" to="/student">Student</Link>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link className="text-white" to="/elective">Electives</Link>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link className="text-white" to="/actions">Actions</Link>
                            </Navbar.Brand>
                        </Nav>
                        <Form inline>
                            <Link className="bg-white" style={{borderRadius: '15px'}} onClick={this.logout}><img src="https://img.icons8.com/dotty/30/000000/logout-rounded.png"/></Link>
                        </Form>
                    </Navbar>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/faculty">
                            <Faculty />
                        </Route>
                        <Route path="/student">
                            <Student />
                        </Route>
                        <Route path="/elective">
                            <Electives />
                        </Route>
                        <Route path="/actions">
                            <Actions />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default NavBar;