import React, { Component } from 'react';
import fire from '../config/Fire';
import { Table, Button, Form } from 'react-bootstrap';


class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getStudentData();
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

    writeStudentData() {
        const studRef = fire.database().ref("3/data/");
        studRef.set(this.state)
        console.log("Data uploded to database");
    }

    updateStudentData(student) {
        this.refs.rollno.value = student.rollno;
        this.refs.student_name.value = student.student_name;
        this.refs.email.value = student.Email;
        this.refs.pref1.value = student.pref1;
        this.refs.pref2.value = student.pref2;
        this.refs.pref3.value = student.pref3;
        console.log("The forms for students have been filled using the student value");
    }

    handleSubmit(event) {
        event.preventDefault();
        let rollno = this.refs.rollno.value;
        let student_name = this.refs.student_name.value;
        let email = this.refs.email.value;
    }

    render() {
        return (
            <div className="col-md-6">
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
                <br/>
                <br/>
                <Form>
                </Form>
            </div>
        )
    }
}




export default Student;