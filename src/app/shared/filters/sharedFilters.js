'use strict';

angular.module('AL-app')
    // makes urls secures for angular. e.g allows external urls to be used in iframes
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])

/**
 * usage : <div ng-bind-html="whatever_needs_to_be_sanitized | sanitize"></div>
 */

    .filter("sanitize", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);




