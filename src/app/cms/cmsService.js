/**
 * Service for to get Page Content from the CMS service
 */

(function () {
    'use strict';

    angular
        .module('aleems-webclient')
        .service('CMSPagesService', CMSPagesService);

    CMSPagesService.$inject = ['CMSPagesResource'];

    function CMSPagesService(CMSPagesResource) {

        var pageContent = {
            content: 'Terms and Conditions content'
        };

        var loadPageContent = function (pageId) {
            CMSPagesResource.getPageContentPublic(pageId).$promise.then(function (res) {
                if (res != undefined) {
                    if (res.hasOwnProperty('pageId') && res.pageId !== '') {
                        pageContent.content = res.content;
                    }
                }
            }, function (errorResponse) {
                pageContent.content = errorResponse;
            });
            return pageContent;
        };

        var getPageContent = function () {
            return pageContent;
        };

        return {
            loadPageContent: loadPageContent,
            getPageContent: getPageContent
        };
    }
})();

