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

@hot(module)
export default class App extends Component {
    render () {
        const options = {
            avatar,
            currentUserFirstName: 'Виктор',
            currentUserLastName:  'Чорнопиский',
        };

        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route component = { Feed } path = '/feed' />
                        <Route component = { Profile } path = '/profile' />
                        <Route component = { Login } path = '/login' />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
