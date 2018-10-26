import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';
import renderer from 'react-test-renderer';

const props = {
    _createPost: jest.fn(),
};

const comment = 'text';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');

const renderTree = renderer.create(<Composer { ...props } />);

describe('Composer component: ', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
    });
    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });
    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });
    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });
    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });
    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });
    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });
    test('should repsonse to state change properly', () => {
        result.setState({
            comment,
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);
        result.setState({
            comment: '',
        });
        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });
    test('_updateComment should be invoked once after textarea changed', () => {
        result.find('textarea').simulate('change', { target: { value: 'Привет' }});
        expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
    });
    test('should handle textarea change event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });
        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });
    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');
        expect(result.state()).toEqual(initialState);
    });
    test('_createPost should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });
    test('_submitOnEnter must be called after key pressed', () => {
        result.find('textarea').simulate('keypress', { key: 'Enter' });
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    });
    test('_submitCommentSpy should not be invoked after press another key', () => {
        result.find('textarea').simulate('keypress', { key: 'Shift' });
        expect(_submitCommentSpy).toHaveBeenCalledTimes(2);
    });
    test('_submitCommentSpy should be invoked after press Enter key', () => {
        result.find('textarea').simulate('keypress', { key: 'Enter' });
        expect(_submitCommentSpy).toHaveBeenCalledTimes(3);
    });
    test('Composer component should correspond to its snapshot counterpart', () => {
        expect(renderTree).toMatchSnapshot();
    });
});
