import React, { Component } from 'react';
import fire from './config/Fire';
import { Table } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Electives from './Electives';
 
class Home extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            faculties: [],
            students: []
        };
    }

    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        this.getFacultyData();
        this.getStudentData();
    }

    getFacultyData() {
        const facRef = fire.database().ref("2/data/");
        console.log(facRef);
        facRef.once('value', (snapshot) => {
            let faculties = snapshot.val();
            let newState = [];
            for (let faculty in faculties) {
                newState.push({
                    id: faculties[faculty].faculty_id,
                    name: faculties[faculty].faculty_name,
                    email: faculties[faculty].Email,
                    preference: faculties[faculty].preference1
                });
            }
            this.setState({
                faculties: newState
            });
        })
        console.log("Get Faculty  Data!");
    }

    getStudentData() {
        const studRef = fire.database().ref("3/data/");
        console.log(studRef);
        studRef.once('value', (snapshot) => {
            let students = snapshot.val();
            let newState = [];
            for (let student in students) {
                newState.push({
                    roll: students[student].rollno,
                    name: students[student].student_name,
                    email: students[student].Email,
                    pref1: students[student]["Preference 1"],
                    pref2: students[student]["Preference 2"],
                    pref3: students[student]["Preference 3"],
                });
            }
            this.setState({
                students: newState
            });
        })
        console.log(this.state.students);
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
                        {this.state.faculties.map((faculty) => {
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
                <h1>Student Data</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Roll No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Preference1</th>
                            <th>Preference2</th>
                            <th>Preference3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students.map((student) => {
                            return (
                                <tr>
                                    <td>{student.roll}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.pref1}</td>
                                    <td>{student.pref2}</td>
                                    <td>{student.pref3}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                <div className="container-login100-form-btn">
                    <button className="login100-form-btn" onClick={this.logout}>Logout</button>
                </div>

                <Router>
                        <Link to="/electives">Elective Data</Link>
                 
                    <Switch>
                        <Route path = "/electives">
                            <Electives dataFromParent = {this.state.faculties}/>
                        </Route>
                    </Switch>
                </Router>

            </div>

            

        )
    }
}


export default Home;