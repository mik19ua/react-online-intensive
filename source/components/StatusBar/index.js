import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';
import { socket } from 'socket/init';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

@withProfile
export default class StatusBar extends Component {
    state = {
        online:          false,
        redirectToLogin: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });
        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _animateStatusBarEnter = (statusBar) => {
        fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
    };

    _logout = () => {
        this.props._logout();
        this.setState({
            redirectToLogin: true,
        });
    };

    render () {
        const { avatar, currentUserFirstName } = this.props;
        const { online } = this.state;
        const statusStyle = cx(Styles.status, {
            [Styles.online]:  online,
            [Styles.offline]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animateStatusBarEnter }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>{statusMessage}</div>
                        <span />
                    </div>
                    <Link to = '/profile'>
                        <img src = { avatar } />
                        <span>{currentUserFirstName}</span>
                    </Link>
                    <Link to = '/feed'>Feed</Link>
                    <button onClick = { this._logout }>Logout</button>
                    {this.state.redirectToLogin && <Redirect to = '/' />}
                </section>
            </Transition>
        );
    }
}
