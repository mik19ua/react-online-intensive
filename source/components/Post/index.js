import React, { Component } from 'react';
import { withProfile } from 'components/HOC/withProfile';
import { func, string, number, array } from 'prop-types';

import moment from 'moment';
import Styles from './styles.m.css';
import Like from 'components/Like';

@withProfile
export default class Post extends Component {
    static propTypes = {
        _deletePost: func.isRequired,
        _likePost:   func.isRequired,
        comment:     string.isRequired,
        created:     number.isRequired,
        id:          string.isRequired,
        likes:       array.isRequired,
    }

    _deletePost = (event) => {
        event.preventDefault();
        const { _deletePost, id } = this.props;

        _deletePost(id);
    }

    render () {
        const { comment, created, _likePost, likes, id, currentUserLastName, currentUserFirstName, avatar } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } onClick = { this._deletePost } />
                <img src = { avatar } />
                <a>{currentUserFirstName} {currentUserLastName}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}
