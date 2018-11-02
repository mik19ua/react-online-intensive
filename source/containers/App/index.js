// Core
import React, { Component } from 'react';
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import { hot } from 'react-hot-loader';
import avatar from 'theme/assets/lisa';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';

import { Provider } from 'components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Виктор',
    currentUserLastName:  'Чорнопиский',
    isAuthinticated:      false,
};

@hot(module)
export default class App extends Component {
    _login = () => {
        options.isAuthinticated = true;
    };

    _logout = () => {
        options.isAuthinticated = false;
    };

    render () {
        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar _logout = { this._logout } />
                    <Switch>
                        <Route
                            path = '/login'
                            render = { () => <Login _login = { this._login } /> }
                        />
                        {!options.isAuthinticated && <Redirect to = '/login' />}
                        <Route component = { Feed } path = '/feed' />
                        <Route component = { Profile } path = '/profile' />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
