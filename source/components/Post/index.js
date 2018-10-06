import React, { Component } from 'react';
import { Consumer } from 'components/HOC/withProfile';
import { func, string, number, array } from 'prop-types';

import moment from 'moment';
import Styles from './styles.m.css';
import Like from 'components/Like'

export default class Post extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        _deletePost: func.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        likes: array.isRequired,
        id: string.isRequired,        
    }

    constructor () {
        super ();
        this._deletePost = this._deletePost.bind(this);
    }

    _deletePost (event) {
        event.preventDefault();
        const { _deletePost, id } = this.props;
        _deletePost(id);
    }

    render () {
        const { comment, created, _likePost, likes, id } = this.props;
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <span className = { Styles.cross } onClick = { this._deletePost }></span>
                        <img src = { context.avatar } />
                        <a>{context.currentUserFirstName} {context.currentUserLastName}</a>
                        <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{comment}</p>
                        <Like
                            _likePost = { _likePost }
                            id = { id }
                            likes = { likes }
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>
        );
    }
}
