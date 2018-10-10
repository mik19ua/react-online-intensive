import React, { Component } from 'react';
import Styles from './styles.m.css';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import { withProfile } from 'components/HOC/withProfile';
import { getUniqueID, delay } from 'instruments';
import moment from 'moment';

@withProfile
export default class Feed extends Component {

    state = {
        posts: [
            { id: '1', comment: 'Hi there!', created: 1538631552, likes: []},
            { id: '2', comment: 'Hello', created: 1538631619, likes: []}],
        isPostsFetching: false,
    };

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostsFetching: state,
        });
    }

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);
        const post = {

            id:      getUniqueID(),
            created: moment.now(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:           [post, ...posts],
            isPostsFetching: false,
        }));
    }

    _deletePost = async (id) => {
        this._setPostsFetchingState(true);
        await delay(1200);
        this.setState(({ posts }) => ({
            posts:           posts.filter((post) => post.id !== id),
            isPostsFetching: false,
        }));
    }

    _likePost = async (id) => {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostsFetchingState(true);
        await delay(1200);
        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID,
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        }
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    }

    render () {
        const { posts } = this.state;
        const { isPostsFetching } = this.state;
        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } _deletePost = { this._deletePost } _likePost = { this._likePost } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}
