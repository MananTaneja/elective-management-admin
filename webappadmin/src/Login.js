import React, { Component } from 'react';
import fire from './config/Fire';
import Background from './images/bg-01.jpg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => { console.log(u) })
            .catch((error) => {
                console.log(error);
            })
    }
    render() {
        return (

            <div className="limiter">

                <div className="container-login100" style={{ backgroundImage: `url(${Background})` }}>

                    <div className="wrap-login100">
                        <form className="login100-form validate-form">
                            <span className="login100-form-logo">
                                <i className="zmdi zmdi-landscape"></i>
                            </span>

                            <span className="login100-form-title p-b-34 p-t-27">
                                Log in
					        </span>
                            <div className="form-group wrap-input100 validate-input">
                                {/* <label for="exampleInputEmail1">Email address</label> */}
                                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <span className="focus-input100" data-placeholder="&#xf207;"></span>
                            </div>
                            <br/>
                            <br/>
                            <div className="form-group wrap-input100 validate-input">
                                {/* <label for="exampleInputPassword1">Password</label> */}
                                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="input100" id="exampleInputPassword1" placeholder="Password" />
                                <span className="focus-input100" data-placeholder="&#xf191;"></span>
                            </div>
                            <br/>
                            <br/>
                            <div className="container-login100-form-btn">
                                <button type="submit" onClick={this.login} className="login100-form-btn">Login</button>
                            </div>

                            {/* <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button> */}
                        </form>

                    </div>
                </div>
            </div >
        );
    }
}
export default Login;