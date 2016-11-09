(function () {
    'use strict';

    angular
        .module('AL-app')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $state, $location, $anchorScroll, $stateParams, $window, $timeout, $log) {

        // When the state is changed move the focus back on top of the page
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $window.scrollTo(0, 0);
        });

        //when the state is changed inject the META tags for new state
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            // SEO meta tags update for each state change
            $rootScope.title = toState.data.metaTitle;
            $rootScope.metaKeywords = toState.data.metaKeywords;
            $rootScope.metaDescription = toState.data.metaDescription;

        });
    }

})();
