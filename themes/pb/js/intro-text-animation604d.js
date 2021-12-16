/*global ScrollMagic*/
/*global TimelineMax*/
/*global Power1*/
/*global CSSRulePlugin*/
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
  Drupal.behaviors.headertextAnimation = {
    attach: function (context, settings) { // eslint-disable-line no-unused-vars
      $('.js-product-title-intro', context).each(function(){
        var titleWrapped = $(this).text().trim().split(' ').map(function(w) {
          return '<span class="is-wordized"><span class="js-title-span-animation-word word is-hidden-down">' + w + '&nbsp;</span></span>';
        }).join('');
        $('.js-product-title-intro', context).css('opacity', '1');
        $(this).html(titleWrapped);
        initAnimation();
      });

      function initAnimation(){
        var wordDelay = 0;
        $('.word').each(function() {
          var $el = $(this);
          setTimeout( function() {
            $el.removeClass('is-hidden-down');
          }, wordDelay);
          wordDelay += 150;
        });
        $('.js-product-tag-intro')
          .delay(wordDelay += 150).animate( { 'top': '0', 'opacity': '1'}, 400 );
        $('.js-product-image-intro')
          .delay(wordDelay += 300).animate( { 'top': '0', 'opacity': '1'}, 400 );
        $('.js-product-content-inner')
          .delay(wordDelay += 450).animate( { 'top': '0', 'opacity': '1'}, 400 );
        $('.js-product-paragraphs')
          .delay(wordDelay += 450).animate( { 'top': '0', 'opacity': '1'}, 400 );

      }

    }
  };


  // We pass the parameters of this anonymous function are the global variables
  // that this script depend on. For example, if the above script requires
  // jQuery, you should change (Drupal) to (Drupal, jQuery) in the line below
  // and, in this file's first line of JS, change function (Drupal) to
  // (Drupal, $)
})(Drupal, jQuery);
