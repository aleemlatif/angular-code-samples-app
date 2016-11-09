/**
 * name: non-angular.js
 * desc: This file contain various non-angularjs JavaScript code snippets e.g. Google Analytics or browser fixes etc.
 */

// IE 10 fix to differentiate device width from viewport width
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    );
    document.querySelector('head').appendChild(msViewportStyle)
}
/**
 * @desc Collection of JQuery utility functions
 */
(function ($) {

    'use strict';

    var fontController = (function (start) {

        var size, maxSize, minSize, savedSize, delta, changeSize;

        if ($.cookie) {
            savedSize = $.cookie('size');
        }

        minSize = start;
        maxSize = start * 2;
        size = savedSize ? parseInt(savedSize, 14) : minSize;
        delta = 2;

        changeSize = function (sz) {
            size = sz;
            $(document.body).css('fontSize', sz + 'px');
            if ($.cookie) {
                $.cookie('size', sz);
            }
        };

        changeSize(size);

        return {
            increase: function () {
                var newSize = Math.min(size + delta, maxSize);
                changeSize(newSize);
            },
            decrease: function () {
                var newSize = Math.max(size - delta, minSize);
                changeSize(newSize);
            }
        };

    }(14));

    /**
     * @desc increase font size
     */

    $(document).on("click", ".btn-decrease", function () {
        fontController.decrease();
    });
    /**
     * @desc decrease font size
     */
    $(document).on("click", ".btn-increase", function () {
        fontController.increase();
    });
    /**
     * @desc print page
     */
    $(document).on("click", ".btn-print", function () {
        window.print();
    });
    /**
     * @desc toggle '+' and '-' signs on (e.g FAQs) accordions
     */
    $(document).on('show.bs.collapse', '.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
        $('a[href="#' + id + '"] .panel-title span.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    });

    $(document).on('hide.bs.collapse', '.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-faq');
        $('a[href="#' + id + '"] .panel-title span.glyphicon').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    });



}(jQuery));

var resizeIframe = (function (obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
});


