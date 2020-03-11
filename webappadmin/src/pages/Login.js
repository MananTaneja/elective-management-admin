import React, { Component } from 'react';
import fire from '../config/Fire';
import Background from '../images/bg-01.jpg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {
        e.preventDefault();
        
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
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
                                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
                                <span className="focus-input100" data-placeholder="&#xf207;"></span>
                            </div>
                            <br/>
                            <br/>
                            <div className="form-group wrap-input100 validate-input">
                                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="input100" id="exampleInputPassword1" placeholder="Password" required/>
                                <span className="focus-input100" data-placeholder="&#xf191;"></span>
                            </div>
                            <br/>
                            <br/>
                            <div className="container-login100-form-btn">
                                <button type="submit" onClick={this.login} className="login100-form-btn">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}
export default Login;