import React, { Component } from 'react';
import Styles from './styles.m.css';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

export default class Feed extends Component {
    render () {

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                <Post />
            </section>
        );
    }
}
