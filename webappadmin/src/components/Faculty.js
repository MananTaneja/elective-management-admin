import React, { Component } from 'react';
import fire from '../config/Fire';
import { Table, Button, Form } from 'react-bootstrap';
 
class Faculty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            faculties: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.getFacultyData();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState != this.state) {
            this.writeFacultyData();
        }
    }

    getFacultyData() {
        const facRef = fire.database().ref("2/data/faculties/");
        console.log(facRef);
        facRef.once('value', (snapshot) => {
            let faculties = snapshot.val();
            let newState = [];
            for (let faculty in faculties) {
                newState.push({
                    id: faculties[faculty].id,
                    name: faculties[faculty].name,
                    email: faculties[faculty].email,
                    preference: faculties[faculty].preference
                });
            }
            this.setState({
                faculties: newState
            });
        })
        console.log(this.state.faculties);
    }

    updateFacultyData(faculty) {
        this.refs.name.value = faculty.name;
        this.refs.id.value = faculty.id;
        this.refs.preference.value = faculty.preference;
        console.log("Faculty Updated");
    }

    handleSubmit(event) {
        event.preventDefault();
        let id = this.refs.id.value;
        let name = this.refs.name.value;
        let preference = this.refs.preference.value;
        const { faculties } = this.state; 
        const facIndex = faculties.findIndex(data => {
            console.log("Found Index" + id);
            return data.id === id;
        })
        faculties[facIndex].name = name;
        faculties[facIndex].preference = preference;
        this.setState({ faculties });
        this.refs.id.value = '';
        this.refs.name.value = '';
        this.refs.preference.value = '';
    }

    writeFacultyData() {
        const facRef = fire.database().ref("2/data/");
        facRef.set(this.state)
        console.log("Data uploded to database");
    }


    render() {
        const { faculties } = this.state;
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
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faculties.map((faculty) => {
                            return (
                                <tr key={faculty.id }>
                                    <td>{faculty.id}</td>
                                    <td>{faculty.name}</td>
                                    <td>{faculty.email}</td>
                                    <td>{faculty.preference}</td>
                                    <td><button onClick = {this.updateFacultyData.bind(this,faculty)}>Click</button></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                <br />
                <br />
                <Form onSubmit = {this.handleSubmit}>
                       
                    <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>ID</label>
                        <input
                                type="text"
                                ref="id"
                                className="form-control"
                                placeholder="ID "
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Name</label>
                        <input
                        type="text"
                        ref="name"
                        className="form-control"
                        placeholder="Name"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Preference</label>
                        <input
                        type="text"
                        ref="preference"
                        className="form-control"
                        placeholder="Preference"
                        />
                    </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Save
                    </button>
              
                </Form>
            </div>

        )
    }
}


export default Faculty;