'use strict';

angular.module('AL-app', [
    'ngCookies', 'ngStorage', 'ngResource', 'ngSanitize', 'ngAnimate', 'ngTouch', 'ngAria',
    'ui.bootstrap', 'ui.utils', 'ui.router',
    'ncy-angular-breadcrumb'
])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        /**
         * HTML5 mode - enabled for SEO friendly URLs. It also depends upon re-routing through .htaccess apache config file
         */

        // $locationProvider.html5Mode({enabled: true});

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('1ColViewsLayout', {
                templateUrl: 'app/shared/templates/1-col-views-layout.html',
                abstract: true,
                data: {
                    requireLogin: false
                }
            })

            .state('2ColViewsLayout', {
                templateUrl: 'app/shared/templates/2-col-views-layout.html',
                abstract: true,
                data: {
                    requireLogin: false
                }
            })

            .state('/', {
                url: "/",
                parent: '1ColViewsLayout',
                views: {

                    'main@1ColViewsLayout': {
                        templateUrl: 'app/main/main.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                },
                data: {
                    metaTitle: 'Home',
                    metaKeywords: 'Home, Aleem, Latif, Test, Application',
                    metaDescription: 'Home page - Aleems Test Application '
                }
            })
            .state('home', {
                url: "/home",
                parent: '1ColViewsLayout',
                views: {

                    'main@1ColViewsLayout': {
                        templateUrl: 'app/main/main.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                },
                data: {
                    metaTitle: 'Home',
                    metaKeywords: 'Home, Aleem, Latif, Test, Application',
                    metaDescription: 'Home page - Aleems Test Application '
                }
            })

            .state('json-table', {
                url: "/json-table",
                parent: '1ColViewsLayout',
                views: {
                    'main@1ColViewsLayout': {
                        templateUrl: 'app/modules/app.jsonTable/jsonTable.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Sortable JSON Data Table',
                    parent:'home'
                },
                data: {
                    metaTitle: 'Home',
                    metaKeywords: 'Home, Aleem, Latif, Test, Application',
                    metaDescription: 'Home page - Aleems Test Application '
                }
            })

            .state('map', {
                url: "/map",
                parent: '1ColViewsLayout',
                views: {

                    'main@1ColViewsLayout': {
                        templateUrl: 'app/modules/map/map.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Map',
                    parent: 'home'
                },
                data: {
                    metaTitle: 'Map',
                    metaKeywords: 'Map, Test, Aleem, Latif, Application',
                    metaDescription: 'Map page - Aleems Test Application '
                }
            })

            .state('help', {
                url: "/help",
                templateUrl: 'app/help/help.html',
                data: {
                    metaTitle: 'help',
                    metaKeywords: 'Help, CEC, Concession, Entitlement, Cards, TfNSW, NSW transport, transportnsw, Transport, Sydney transport',
                    metaDescription: 'Help page - Concession Entitlement Cards  application'
                }
            })

            .state('error', {
                url: "/error",
                templateUrl: 'app/pages/error/error.html',
                controller: 'ErrorCtrl',
                data: {
                    requireLogin: false,
                    metaTitle: 'error',
                    metaKeywords: 'Error, CEC, Concession, Entitlement, Cards, TfNSW, NSW transport, transportnsw, Transport, Sydney transport',
                    metaDescription: 'Error page - Concession Entitlement Cards  application'
                }
            })
            .state('maintenance', {
                url: "/maintenance",
                templateUrl: 'app/pages/error/maintenance.html',
                data: {
                    requireLogin: false,
                    metaTitle: 'Maintenance Mode',
                    metaKeywords: 'Maintenance Mode, CEC, Concession, Entitlement, Cards, TfNSW, NSW transport, transportnsw, Transport, Sydney transport',
                    metaDescription: 'Maintenance Mode - Concession Entitlement Cards  application'
                }
            });
    }])
    .run(['$rootScope', '$state', '$location', '$anchorScroll', '$stateParams', '$window', '$timeout', function ($rootScope, $state, $location, $anchorScroll, $stateParams, $window, $timeout) {

        // When the state is changed ensure user is authorised to view the state
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $window.scrollTo(0, 0);
        });

        //when the route is changed scroll to the proper element.
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            // SEO meta tags update for each state change
            $rootScope.title = toState.data.metaTitle;
            $rootScope.metaKeywords = toState.data.metaKeywords;
            $rootScope.metaDescription = toState.data.metaDescription;

        });
    }]);
