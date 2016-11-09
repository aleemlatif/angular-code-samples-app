(function () {
    'use strict';

    angular
        .module('AL-app')
        .config(routesConfig);

    /** @ngInject */
    function routesConfig($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $logProvider) {

        // Enable log
        $logProvider.debugEnabled(true);

        // HTML5 mode - enabled for SEO friendly URLs. It also depends upon re-routing through .htaccess apache config file
        //$locationProvider.html5Mode({enabled: true});

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
                    metaKeywords: 'Home, Sample, Code, Snippets, AngularJS, Single, Page, ApplicationroutesConfig',
                    metaDescription: 'Home page - AngularJS based Code Snippets Application'
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
                    metaKeywords: 'Home, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Home page - AngularJS based Code Snippets Application'
                }
            })

            .state('sortableTable', {
                url: "/sortableTable",
                parent: '1ColViewsLayout',
                views: {
                    'main@1ColViewsLayout': {
                        templateUrl: 'app/modules/sortableTable/sortableTable.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Sortable - JSON Data Table',
                    parent: 'home'
                },
                data: {
                    metaTitle: 'Sortable JSON Data table',
                    metaKeywords: 'Sortable, JSON, Data, table, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Sortable JSON Data table - AngularJS based Code Snippets Application '
                }
            })

            .state('modalFocus', {
                url: "/modalFocus",
                parent: '1ColViewsLayout',
                views: {
                    'main@1ColViewsLayout': {
                        templateUrl: 'app/modules/modalFocus/modalFocus.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Modal Focus',
                    parent: 'home'
                },
                data: {
                    metaTitle: 'Modal Focus',
                    metaKeywords: 'Modal, Focus, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Modal, Focus - AngularJS based Code Snippets Application '
                }
            })
            .state('modelDataReset', {
                url: "/modelDataReset",
                parent: '1ColViewsLayout',
                views: {
                    'main@1ColViewsLayout': {
                        templateUrl: 'app/modules/modelDataReset/modelDataReset.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Angular Model - Data Reset',
                    parent: 'home'
                },
                data: {
                    metaTitle: 'Angular Model - Data Reset',
                    metaKeywords: 'Angular Model, Data Reset, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Angular Model - Data Reset - AngularJS based Code Snippets Application '
                }
            })

            .state('renderHTML', {
                url: "/renderHTML",
                parent: '1ColViewsLayout',
                views: {
                    'main@1ColViewsLayout': {
                        templateUrl: 'app/modules/renderHTML/renderHTML.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Render HTML',
                    parent: 'home'
                },
                data: {
                    metaTitle: 'Render HTML',
                    metaKeywords: 'Render HTML, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Render HTML - AngularJS based Code Snippets Application '
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
                    metaKeywords: 'Map, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Map page - AngularJS based Code Snippets Application '
                }
            })

            .state('help', {
                url: "/help",
                templateUrl: 'app/help/help.html',
                data: {
                    metaTitle: 'help',
                    metaKeywords: 'Help, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Help page - AngularJS based Code Snippets Application'
                }
            })

            .state('error', {
                url: "/error",
                templateUrl: 'app/pages/error/error.html',
                controller: 'ErrorCtrl',
                data: {
                    requireLogin: false,
                    metaTitle: 'error',
                    metaKeywords: 'Error, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Error page - AngularJS based Code Snippets Application'
                }
            })
            .state('maintenance', {
                url: "/maintenance",
                templateUrl: 'app/pages/error/maintenance.html',
                data: {
                    requireLogin: false,
                    metaTitle: 'Maintenance Mode',
                    metaKeywords: 'Maintenance Mode, Sample, Code, Snippets, AngularJS, Single, Page, Application',
                    metaDescription: 'Maintenance Mode - AngularJS based Code Snippets Application'
                }
            });
    }

})();
