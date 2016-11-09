'use strict';

angular.module('AL-app')

    .constant('ERRORS', {
        required: 'This is a required field.',
        invalid: 'Invalid entry.',
        minLength: 'Your input is too short.',
        maxLength: 'Your input is too long.',
        email: 'Invalid email address.',
        digits: 'This is a digits only field.',
        alphabets: 'This is an alphabets only field.',
        alphanumeric: 'This is an alphanumeric only field.',
        startDate: 'The start date cannot be in the past.',
        endDate: 'The end date cannot be before the start date.',
        unsavedChanges: 'You have unsaved changes on this page.  Are you sure you want to cancel this action?',
        format: {
            date: 'The date you have entered is not valid. Please re-enter.'
        },
        placeholders: 'Please replace the placeholder text or delete all the text in the field'
    });
