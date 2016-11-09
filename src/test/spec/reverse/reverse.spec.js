'use strict';

describe('Filters', function () {
    beforeEach(module('AL-app'));

    describe('reverse', function () {

        var reverse;

        beforeEach(inject(function ($filter) {
            reverse = $filter('reverse', {});
        }));

        it('Should reverse a string', function () {
            expect(reverse('aleem')).toBe('meela');
            expect(reverse('latif')).toBe('fital');

            //expect(reverse('mughal')).toBe('failedtest');
        });
    });
});
