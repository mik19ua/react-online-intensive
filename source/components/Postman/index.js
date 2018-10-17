//Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
//Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

const _animatePostmanExit = (postman) => {
    fromTo(postman, 1, { x: 0 }, { x: 300 });
    console.log('exiting');
};

const _animatePostmanEnter = (postman) => {
    fromTo(postman, 1, { x: 300 }, { x: 0 });
};

const Postman = (props) => {
    return (
        <Transition
            appear
            in
            timeout = { 5000 }
            onEnter = { _animatePostmanEnter }
            onEntered = { _animatePostmanExit }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome {props.currentUserFirstName}</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
