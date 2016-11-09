/**
 * Directive to compile HTML (with angular code inside) from CMS
 */
angular.module('aleems-webclient')
    .directive('dynamicHTML', function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, ele, attrs) {
                scope.$watch(attrs.dynamicHTML, function (html) {
                    ele.html(html);
                    $compile(ele.contents())(scope);
                });
            }
        };
    });
