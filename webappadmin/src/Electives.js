import React, { Component } from 'react';
import fire from './config/Fire';
import { Table } from 'react-bootstrap';

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
            <div className="col-md-6">
                <h1>Faculty Data</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Preference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dataFromParent.map((faculty) => {
                            return (
                                <tr>
                                    <td>{faculty.id}</td>
                                    <td>{faculty.name}</td>
                                    <td>{faculty.email}</td>
                                    <td>{faculty.preference}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                <br />
                <br />
                
                <div className="container-login100-form-btn">
                    <button className="login100-form-btn" onClick={this.logout}>Logout</button>
                </div>
            </div>

        )
    }
}

export default Electives;