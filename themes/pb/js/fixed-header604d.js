/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function (Drupal, $) { // eslint-disable-line no-unused-vars

  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.pbFixedHeader = {
    attach: function (context, settings) { // eslint-disable-line no-unused-vars
      var height;

      /**
       * Toggle the is fixed class when the page is scrolled.
       * @returns {undefined}
       */
      function toggleFixedClass() {
        height = $(window).scrollTop();

        if(height  > 1) {
          if($('.js-header', context).hasClass('is-fixed')) {
            return;
          }
          $('.js-header', context).addClass('is-fixed');
        }
        else {
          $('.js-header', context).removeClass('is-fixed');
        }
      }

      toggleFixedClass();

      $(window).scroll(function() {
        toggleFixedClass();
      });

    }
  };

  // We pass the parameters of this anonymous function are the global variables
  // that this script depend on. For example, if the above script requires
  // jQuery, you should change (Drupal) to (Drupal, jQuery) in the line below
  // and, in this file's first line of JS, change function (Drupal) to
  // (Drupal, $)
})(Drupal, jQuery);
