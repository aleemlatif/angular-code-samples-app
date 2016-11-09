'use strict';

angular.module('aleems-webclient')
    .controller('CMSCtrl', ['$state', '$scope', '$stateParams', '$location', 'PegaUrlResource', 'CMSPagesService', 'MaintenanceService', 'MaintenanceResource', '$localStorage', '$sessionStorage', 'windowService', '$anchorScroll', '$timeout', '$window', '$modal', '$log', function ($state, $scope, $stateParams, $location, PegaUrlResource, CMSPagesService, MaintenanceService, MaintenanceResource, $localStorage, $sessionStorage, windowService, $anchorScroll, $timeout, $window, $modal, $log) {
        $scope.pegaEnvURL = '';
        $scope.pegaEnvUrlError = false;
        $scope.pegaEnvUrlErrorMsg = '';
        $scope.maintenanceMsg = {show: false, message: '', error: ''};
        $scope.genericErrorMsg = '<h5>Please note</h5><p>The following functions are temporarily unavailable:</p><ul><li>"Order a new Concession Entitlement Card"</li><li>"Replace a lost or stolen card which is still valid"</li><li>"Renew my existing card which is expiring soon or has expired"</li><li>"Update my details"</li></ul><p>Please check back later.</p><p>We regret any inconvenience caused.</p>';

        // fetch cms page content using state as the page-id
        var pageId = $state.$current.name;

        // Only load cms content for T&Cs page
        if ($state.is('webservices') || $state.is('termsAndConditions') || $state.is('termsAndConditionsExDefence') || $state.is('faqs') || $state.is('faqsExDefence') || $state.is('accessibility') || $state.is('copyrightAndDisclaimer')) {
            CMSPagesService.loadPageContent({pageId: pageId});
            $scope.pageContent = {};
            $scope.pageContent = CMSPagesService.getPageContent();
        }

        // To DO
        // $compile the HTML returned from CMS after the $scope.pegaEnvURL var has been resolved by the pegaURLService

        /**
         * $desc maintenance service method to get maintenance-message status and message
         * @returns {maintenanceMsg obj}
         */
        $scope.getStatusAndMsg = function () {
            MaintenanceResource.getStatusPublic(function (res) {
                if (res != undefined) {
                    if (res.hasOwnProperty('up')) {
                        $scope.maintenanceMsg.show = res.up;
                        if ($scope.maintenanceMsg.show === true) {

                            // Now as the maintenance message has been set to 'ON', so get the corresponding maintenance message from the service
                            MaintenanceResource.getMsgPublic(function (res) {
                                if (res != undefined) {
                                    if (res.hasOwnProperty('message') && (res.message !== '' )) {
                                        $scope.maintenanceMsg.message = res.message;
                                    }
                                }
                            }, function (errorResponse) {
                                $scope.maintenanceMsg.show = true;
                                $scope.maintenanceMsg.error = $scope.genericErrorMsg;
                            });
                        }
                    }
                }
            }, function (errorResponse) {
                $scope.maintenanceMsg.show = true;
                $scope.maintenanceMsg.error = $scope.genericErrorMsg;
            });
        };

        // Check from maintenance-service, to see if needs to show maintenance message
        $scope.getStatusAndMsg();

        $scope.accordions = {};
        $scope.accordions.status = {
            isOpen_0: true,
            isOpen_1: false,
            isOpen_2: false,
            isOpen_3: false,
            isOpen_4: false,
            isOpen_5: false,
            isOpen_6: false,
            isOpen_7: false,
            isOpen_8: false,
            isOpen_9: false,
            isOpen_10: false,
            oneAtATime: true
        };

        /**
         * $desc function to return total elements within an Object
         * @returns {number}
         */

        var lengthObj = function (obj) {
            var n = 0;
            for (var p in obj) if (obj.hasOwnProperty(p))++n;
            return n;
        };

        /**
         * $desc function to set all accordion status values to false to close all accordions by default
         * @param obj
         */
        var closeAllAccordions = function (obj) {
            for (var p in obj) {
                if ((obj.hasOwnProperty(p)) && (p.indexOf("isOpen_") != -1)) {
                    obj[p] = false;
                }
            }
        };

        if ($stateParams.OpenAccordionId != undefined) {
            closeAllAccordions($scope.accordions.status);
            $scope.accordions.status['isOpen_' + $stateParams.OpenAccordionId] = true;

        }

        $scope.openAccordion = function (accordionNumber) {
            $scope.accordions.status['isOpen_' + accordionNumber] = true;
        };

        /**
         * @desc function to get Pega environment URL based upon cec-microsite hosting environment
         * @param envVar
         */
        var setPegaEnvURL = function (envVar) {

            PegaUrlResource.get({env: envVar}, function (urlObj) {
                if (typeof urlObj !== 'undefined') {
                    $scope.pegaEnvURL = urlObj.pegaBaseUrl;
                } else {
                    $scope.pegaEnvURL = '';
                }
            }, function (eData) {
                 //console.log(JSON.stringify(eData));
                $scope.pegaEnvUrlError = true;
                $scope.pegaEnvUrlErrorMsg = $scope.genericErrorMsg;
            });
        };

        if ((window.location.hostname.indexOf('127.0.0.1') > -1 ) || (window.location.hostname.indexOf('localhost') > -1 )) {
            //$scope.pegaEnvURL = PegaUrlResource.getDevUrl().pegaBaseUrl;
            setPegaEnvURL('x_dev');

        } else if (window.location.hostname.indexOf('sep-int') > -1) {
            setPegaEnvURL('x_dev');

        } else if ((window.location.hostname.indexOf('sep-uat') > -1 ) || (window.location.hostname.indexOf('test.apps.transport.nsw.gov.au') > -1 ) || (window.location.hostname.indexOf('sep-review') > -1 ) || (window.location.hostname.indexOf('sep-sit') > -1 )) {
            setPegaEnvURL('x_uat');

        } else if (window.location.hostname.indexOf('sep-release') > -1) {
            setPegaEnvURL('x_preprod');

        } else {
            setPegaEnvURL('prod');
        }

        $scope.pegacecURL = $scope.pegaEnvURL + 'Applycec/Applycec.html';
        $scope.pegaTBPURL = $scope.pegaEnvURL + 'ApplyTBP/ApplyTBP.html';

        /**
         * @desc move the page focus back one top of the page
         * @param id
         */
        $scope.scrollTo = function (id) {
            $timeout(function () {
                $location.hash(id);
                $anchorScroll();
                document.getElementById(id).focus();
            });
        };

        /**
         * @desc opens a new popup window
         */
        $scope.openWindow = function (url, windowName, windowFeatures) {
            windowService.openWindow(url, windowName, windowFeatures);
        };
        /**
         * @desc navigates to the parsed 'state'
         */
        $scope.gotoState = function (page) {
            $state.go(page);
        };
    }]);
