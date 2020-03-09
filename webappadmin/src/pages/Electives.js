import React, { Component } from 'react';
import fire from '../config/Fire';
import { Table } from 'react-bootstrap';

class Electives extends Component {

    constructor(props) {
        super(props);
        this.state = {
            electives: []
        };
    }

    componentDidMount() {
        this.getElectiveData();
    }

    getElectiveData() {
        const elecRef = fire.database().ref("4/data/electives/");
        console.log(elecRef);
        elecRef.once('value', (snapshot) => {
            let electives = snapshot.val();
            let newState = [];
            for (let elective in electives) {
                newState.push({
                    course_code: electives[elective].course_code,
                    name: electives[elective].name,
                    credits: electives[elective].credits,
                    isLab: electives[elective].isLab,
                    classroom: electives[elective].classroom,
                    max_allowed: electives[elective].max_allowed,
                    numOfStudents: electives[elective].numOfStudents
                });
            }
            this.setState({
                electives: newState
            });
        })
        console.log(this.state.electives);
    }

    render() {
        return (
            <div className="col-md-12">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>    
                            <th>Course Code</th>
                            <th>Name</th>
                            <th>Credits</th>
                            <th>Lab</th>
                            <th>Class Room</th>
                            <th>Students Enrolled</th>
                            <th>Max Allowed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.electives.map((elective) => {
                            return (
                                <tr key={elective.course_code}>
                                    <td>{elective.course_code}</td>
                                    <td>{elective.name}</td>
                                    <td>{elective.credits}</td>
                                    <td>{elective.isLab}</td>
                                    <td>{elective.classroom}</td>
                                    <td>{elective.numOfStudents}</td>
                                    <td>{elective.max_allowed}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                <br/>
                <br/>

            </div>
        )
    }
}

export default Electives;