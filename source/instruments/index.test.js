import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('instruments: ', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });
    test('sum function should throw exception, when called with non-number type as second argument', () => {
        expect(() => sum(1, 'test string')).toThrow();
    });
    test('sum function should throw exception, when called with non-number type as first argument', () => {
        expect(() => sum('test string', 1)).toThrow();
    });
    test('sum function should return an addition of two arguments', () => {
        expect(sum(4, 1)).toBe(5);
    });
    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });
    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });
    test('getUniqueID function should throw exception, when called with non-number type as argument', () => {
        expect(() => getUniqueID('test string')).toThrow();
    });
    test('getUniqueID function should produce a string of a desired given length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
        expect(getUniqueID()).toHaveLength(15);
    });
    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });
    test('getFullApiUrl function should throw exception, when called with non-string type as first argument', () => {
        expect(() => getFullApiUrl(1, 'test')).toThrow();
    });
    test('getFullApiUrl function should throw exception, when called with non-string type as second argument', () => {
        expect(() => getFullApiUrl('test', 1)).toThrow();
    });
    test('getFullApiUrl function should produce a string', () => {
        const apiURL =  'apiURL';
        const groupId = 'groupId';

        expect(typeof getFullApiUrl('test', 'string')).toBe('string');
        expect(getFullApiUrl(apiURL, groupId)).toContain(apiURL, '/', groupId);
    });
});
