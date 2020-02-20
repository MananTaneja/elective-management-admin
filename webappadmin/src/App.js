import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import Login from './Login';
import Home from './Home';
import { Navbar } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        // localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem('user');
      }
    });
  }




  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Elective Management System</Navbar.Brand>
        </Navbar>
        <div>{this.state.user ? (<Home />) : (<Login />)}</div>
      </div>
    );
  }
}

export default App;