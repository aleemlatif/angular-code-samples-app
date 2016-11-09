/**
 * Resource to get page content for CMS pages from the cec cms-service
 */

(function () {
    'use strict';

    angular
        .module('aleems-webclient')
        .factory('CMSPagesResource', CMSPagesResource);

    CMSPagesResource.$inject = ['$resource'];

    function CMSPagesResource($resource) {

        return $resource('/AL-service/status/', {pageId: '@pageId'}, {
            'getPageContentPublic': {
                method: 'GET',
                url: '/AL-service/pageContent/:pageId'
            }
        });
    }
})();

