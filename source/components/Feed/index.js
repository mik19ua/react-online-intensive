import React, { Component } from 'react';
import Styles from './styles.m.css';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

export default class Feed extends Component {
    state = {
        posts: [
            { id: '1', comment: 'Hi there!', created: 1538631552 },
            { id: '2', comment: 'Hello', created: 1538631619 }],
        isDataFetching: true,
    }

    render () {
        const { posts } = this.state;
        const { isDataFetching } = this.state;
        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isDataFetching } />
                <StatusBar />
                <Composer />
                { postsJSX }
            </section>
        );
    }
}
