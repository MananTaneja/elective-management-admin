import React, { Component } from 'react';
import fire from '../config/Fire';
import { Table, Form } from 'react-bootstrap';


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

    componentDidUpdate(prevProps, prevState) {
        if(prevState !== this.state) {
            this.writeStudentData();
        }
    }

    getStudentData() {
        const studRef = fire.database().ref("3/data/students/");
        console.log(studRef);
        studRef.once('value', (snapshot) => {
            let students = snapshot.val();
            let newState = [];
            for (let student in students) {
                newState.push({
                    roll: students[student].roll,
                    name: students[student].name,
                    email: students[student].email,
                    pref1: students[student].pref1,
                    pref2: students[student].pref2,
                    pref3: students[student].pref3,
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
        this.refs.rollno.value = student.roll;
        this.refs.student_name.value = student.name;
        this.refs.email.value = student.email;
        this.refs.pref1.value = student.pref1;
        this.refs.pref2.value = student.pref2;
        this.refs.pref3.value = student.pref3;
        console.log("The forms for students have been filled using the student value");
    }

    handleSubmit(event) {
        event.preventDefault();
        let rollno = this.refs.rollno.value;
        let name = this.refs.student_name.value;
        let email = this.refs.email.value;
        let pref1 = this.refs.pref1.value;
        let pref2 = this.refs.pref2.value;
        let pref3 = this.refs.pref3.value;
        const { students } = this.state;
        const studIndex = students.findIndex(data => {
            console.log("Found Index " + rollno);
            return data.roll === rollno;
        })
        console.log(studIndex);
        students[studIndex].name = name;
        students[studIndex].email = email;
        students[studIndex].pref1 = pref1;
        students[studIndex].pref2 = pref2;
        students[studIndex].pref3 = pref3;
        this.setState({ students });
        this.refs.rollno.value = "";
        this.refs.student_name.value = "";
        this.refs.email.value = "";
        this.refs.pref1.value = "";
        this.refs.pref2.value = "";
        this.refs.pref3.value = "";
    }

    render() {
        return (
            <div className="col-md-12">
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
                                <tr key={student.roll}>
                                    <td>{student.roll}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.pref1}</td>
                                    <td>{student.pref2}</td>
                                    <td>{student.pref3}</td>
                                    <td><button onClick = {this.updateStudentData.bind(this, student)}>Click</button></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                <br/>
                <br/>
                <Form onSubmit = {this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Roll Number</label>
                        <input
                                type="text"
                                ref="rollno"
                                className="form-control"
                                placeholder="Roll Number"
                                readOnly
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Name</label>
                        <input
                        type="text"
                        ref="student_name"
                        className="form-control"
                        placeholder="Name"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input
                        type="text"
                        ref="email"
                        className="form-control"
                        placeholder="Email"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Preference 1</label>
                        <input
                        type="text"
                        ref="pref1"
                        className="form-control"
                        placeholder="First Preference"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Preference 2</label>
                        <input
                        type="text"
                        ref="pref2"
                        className="form-control"
                        placeholder="Second Preference"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Preference 2</label>
                        <input
                        type="text"
                        ref="pref3"
                        className="form-control"
                        placeholder="Third Preference"
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




export default Student;