import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Styles from './styles.m.css';

export default class Login extends Component {
    state = {
        redirectToFeed: false,
    };
    login = () => {
        this.props._login();

        this.setState({
            redirectToFeed: true,
        });
    };
    render () {
        return (
            <div className = { Styles.login }>
                <button onClick = { this.login }>Log in</button>
                {this.state.redirectToFeed && <Redirect to = '/feed' />}
            </div>
        );
    }
}
