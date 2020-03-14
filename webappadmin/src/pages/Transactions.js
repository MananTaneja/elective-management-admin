import React, { Component } from 'react';
import fire from '../config/Fire';
import { Table } from 'react-bootstrap';

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions:[]
        };
    }

    componentDidMount() {
        this.getTransactionData();
    }

    getTransactionData() {
        const transRef = fire.database().ref("5/data/transactions/");
        console.log(transRef);
        transRef.once('value', (snapshot) => {
            let transactions = snapshot.val();
            let newState = [];
            for (let transaction in transactions) {
                newState.push({
                    chosen: transactions[transaction].chosen,
                    dateTime: transactions[transaction].dateTime,
                    roll: transactions[transaction].roll,
                });
            }
            this.setState({
                transactions:newState
            });
        })
        console.log(this.state.transactions)
    }

    render() {
        return (
            <div className="col-md-12">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>    
                            <th>Roll Number</th>
                            <th>Course Chosen</th>
                            <th>Date Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map((transaction) => {
                            return (
                                <tr key={transaction.roll}>
                                    <td>{transaction.roll}</td>
                                    <td>{transaction.chosen}</td>
                                    <td>{transaction.dateTime}</td>
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

export default Transactions;