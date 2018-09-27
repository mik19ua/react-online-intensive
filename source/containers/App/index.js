// Core
import React, { Component } from 'react';
import Feed from 'components/Feed';
import { hot } from 'react-hot-loader';
import avatar from 'theme/assets/lisa';

@hot(module)
export default class App extends Component {
    render () {
        const options = {
            avatar,
            currentUserFirstName: 'Lisa',
            currentUserLastName:  'Simpson',
        };

        return <Feed { ...options } />;
    }
}
