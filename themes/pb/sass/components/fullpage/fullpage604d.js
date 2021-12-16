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
(function (Drupal, $) {

  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.myFullpage = {
    myFullpage: null,
    detach: function (context) {
      if(Drupal.behaviors.myFullpage.myFullpage) {
        Drupal.behaviors.myFullpage.myFullpage.destroy('all');
      }
    },
    attach: function (context) { // eslint-disable-line no-unused-vars
      var fullPageContext  = $('.js-fullpage-wrapper', context);
      var wordDelay = 300;

      if(fullPageContext.length > 0) {
        Drupal.behaviors.myFullpage.myFullpage = new fullpage('.js-fullpage-wrapper', {
          //Navigation
          anchors:[
            'home-intro',
            'Penguin',
            'Squirrel',
            'Rabbit',
            'Quiz',
            'Contact',
          ],
          navigation: true,
          navigationPosition: 'right',
          navigationTooltips: [
            'Intro',
            'Penguin',
            'Squirrel',
            'Rabbit',
            'Quiz',
            'Contact',
          ],
          showActiveTooltip: false,

          //Scrolling
          scrollingSpeed: 700,
          autoScrolling: true,
          fitToSection: true,
          fitToSectionDelay: 1000,
          scrollBar: false,
          scrollOverflow: true,
          sectionsColor: [
            '#DBFFFF',
            '#6789C4',
            '#62B28E',
            '#7E779E',
            '#BFB44F',
            '#5D5D5D'
          ],
          //Custom selectors
          sectionSelector: '.js-section',
          lazyLoading: true,
          //events
          afterLoad: function(origin, destination) {
           // Bind on first load only
            if ((origin === null && destination.anchor === 'home-intro')
              || (origin.anchor === 'home-intro'))  {
              jQuery('.word').each(function() {
                var $el = $(this);
                setTimeout( function() {
                  $el.removeClass('is-hidden-down');
                }, wordDelay);
                wordDelay += 150;
              });
              jQuery('.js-intro-text')
                .delay('900').animate( { 'top': '0', 'opacity': '1'}, 400 );
              jQuery('.js-discover-arrow')
                .delay('1100').animate( { 'top': '0', 'opacity': '1'}, 400 );
              jQuery('.js-fullpage-intro-image')
                .delay('100').animate( { 'transform': 'translateY(-40%)', 'opacity': '1'}, 2000 );
            }
          },
          licenseKey: '4CECB8F9-87824E40-AB351696-A5EA510C'
        });
      }
    }
  };
})(Drupal, jQuery);
