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
    };

    _deletePost = (event) => {
        event.preventDefault();
        const { _deletePost, id } = this.props;

        _deletePost(id);
    };

    _getCross = () => {
        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return `${firstName} ${lastName}` ===
            `${currentUserFirstName} ${currentUserLastName}` ? (
                <span className = { Styles.cross } onClick = { this._deletePost } />
            ) : null;
    };

    render () {
        const {
            comment,
            created,
            _likePost,
            likes,
            id,
            lastName,
            firstName,
            avatar,
        } = this.props;
        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                {cross}
                <img src = { avatar } />
                <a>
                    {firstName} {lastName}
                </a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like _likePost = { _likePost } id = { id } likes = { likes } />
            </section>
        );
    }
}
