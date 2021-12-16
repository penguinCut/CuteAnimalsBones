/**
 * @file
 * A JavaScript file responsive tables.
 *
 * http://johnpolacek.github.io/stacktable.js/ is used.
 */

(function (Drupal, $) { // eslint-disable-line no-unused-vars

  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.myResponsiveTable = {
    attach: function (context, settings) { // eslint-disable-line no-unused-vars

      // Place your code here.
      if ($('table', context).length) {
        // Apply now.
        // Read more
        $('.js-table-toggled tbody', context).hide();
        $('.js-table-show', context).on('click', function() {
          // $('.js-table-show').hide();
          $('.js-table-toggled', context).find('tbody').toggle();
          var tableText = $('.js-table-text', context).text();
          $('.js-table-text', context).innerHTML = "Close";
          $('.js-table-text', context).text(
            tableText === "Open" ? "Close" : "Open"
          );
          $('.js-table-arrow', context).toggleClass('is-collapse');
        });
      }
    }
  };

})(Drupal, jQuery);
