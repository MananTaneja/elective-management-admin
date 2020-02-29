import React, { Component } from 'react';
import fire from '../config/Fire';

class Electives extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <h1>Electives</h1>
            </div>
        )
    }
}

export default Electives;