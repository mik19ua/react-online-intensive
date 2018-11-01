import React, { Component } from 'react';

export default class Login extends Component {
    login = () => {};
    render () {
        return <button onClick = { this.login }>Log in</button>;
    }
}
