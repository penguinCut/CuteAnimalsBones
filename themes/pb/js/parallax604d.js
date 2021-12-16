/*global ScrollMagic*/
/*global TweenMax*/
/*global Power1*/
/*global Linear*/
/*global Modernizr*/
/* eslint-disable require-jsdoc, valid-jsdoc, max-len */

/**
 * Adds a small movement to elements.
 * USAGE:
 * Wrapper should have the js-parallax-{speed} class.
 * .js-parallax-slow
 * .js-parallax-slower
 * .js-parallax-slower-fixed
 * .js-parallax-fast
 *
 * an inner element should have the .js-parallax-inner class
 * Example: https://www.konstolymp.gr/production-process/hand-collection
 */
(function (Drupal, $) {

  'use strict';

  Drupal.behaviors.parallax = {
    controller: null,
    pinnedScene: null,
    detach: function (context) {
      if (Drupal.behaviors.parallax.controller) {
        Drupal.behaviors.parallax.controller =
          Drupal.behaviors.parallax.controller.destroy(true);

        // Clear all extra inline styles
        $('.js-parallax-inner', context).each(function () {
          $(this).removeAttr('style');
        });
      }
    },

    attach: function (context) {
      var windowHeight = $(window).height();
      var windowWidth = $(window).width();

      /**
       * Destroy Scroll Magic Controller
       */
      function destroyScrollMagic() {
        if (Drupal.behaviors.parallax.controller) {
          Drupal.behaviors.parallax.controller = Drupal.behaviors.parallax.controller.destroy(true);

          // Clear all extra inline styles
          $('.js-parallax-inner', context).each(function () {
            $(this).removeAttr('style');
          });
        }
      }

      // Init ScrollMagic
      function initScrollMagic() {
        windowHeight = $(window).height();
        windowWidth = $(window).width();
        var contentWidth = $('.js-product-content', context).width();

        Drupal.behaviors.parallax.controller = new ScrollMagic.Controller();

        // Create scenes - slow
        $('.js-parallax-slow', context).each(function() {
          var mySpeed = -($(this).find('.js-parallax-inner').height() + 240);

          var thisTween = TweenMax.to(
            $(this).find('.js-parallax-inner'),
            1,
            {y: (mySpeed)+'px', ease: Power1.easeOut}
          );
          new ScrollMagic.Scene({
            triggerElement: $(this),
            duration: $('.js-product-content-inner', context).offset().top
          })
            .setTween(thisTween)
            .addTo(Drupal.behaviors.parallax.controller);
        });

        $('.js-parallax-fast', context).each(function() {
          var mySpeed = windowHeight* 2/3;

          var fastTween = TweenMax.to(
            $(this).find('.js-parallax-inner'),
            1,
            {y: (-mySpeed)+'px', ease: Linear.easeNone}
          );
          new ScrollMagic.Scene({
            triggerElement: $(this),
            duration: windowHeight * 2/3
          })
            .setTween(fastTween)
            .addTo(Drupal.behaviors.parallax.controller);
        });

        $('.js-product-image-wrapper', context).each(function() {
          var timeline = new TimelineMax();

          timeline.to(
            '.js-left-cut',
            3.5,
            {
              x: -(windowWidth/2 + $(this).width()/2)
            }, 0
          );
          timeline.to(
            '.js-background-image',
            3.5,
            {
              x: -(windowWidth/2 + $(this).width()/2)
            }, 0
          );
          timeline.to(
            '.js-right-cut',
            3.5,
            {
              x: (windowWidth/2 + $(this).width()/2)
            }, 0
          );

          timeline.to(
            '.js-right-cut-shadow',
            3.5,
            {
              x: (windowWidth/2 + $(this).width()/2)
            }, 0
          );

          timeline.to(
            '.js-content-image-back',
            .8,
            {
              x: Math.abs((contentWidth/2 - $(this).width())/2 + $(this).width()/2 + 50)
            },0
          );

          timeline.to(
            '.js-content-image-front',
            1,
            {
              x: Math.abs((contentWidth/2 - $(this).width())/2 + $(this).width()/2)
            },0
          );

          timeline.to(
            '.js-content-image-front',
            .4,
            {
              y: 50
            }, 1
          );

          new ScrollMagic.Scene({
            triggerElement: '.js-image-trigger',
            duration: windowHeight * 1.2
          })
            .setTween(timeline)
            .addTo(Drupal.behaviors.parallax.controller);
        });

        $('.js-product-image-wrapper', context).each(function() {
          // Calculate pin duration.
          var pinDuration = $('.js-product-content').outerHeight();
          new ScrollMagic.Scene({
            triggerElement: '.js-image-trigger',
            duration: pinDuration
          })
            .setPin('.js-product-image-wrapper', {pushFollowers: false})
            .addTo(Drupal.behaviors.parallax.controller);
        });
      }

      function resizedWindow() {
        if($(window).width() !== windowWidth) {

          destroyScrollMagic();

          $('html, body').animate({
              scrollTop: 0
            },{duration: 0,
              complete: function() {
                if (Modernizr.mq('(max-width: 992px)')) {
                }

                else {
                  if (!Drupal.behaviors.parallax.controller) {
                    initScrollMagic();
                  }
                }
              }}
          );
        }
      }

      var doitafterresize;

      window.addEventListener('resize', function() {
        clearTimeout(doitafterresize);
        doitafterresize = setTimeout(resizedWindow, 500);
      });

      if($('.js-parallax-slow', context).length > 0) {
        // Disable all on smaller devices.
        if (Modernizr.mq('(max-width: 992px)')) {
          if (Drupal.behaviors.parallax.controller) {
            destroyScrollMagic();
          }
          return;
        }

        else {
          if (!Drupal.behaviors.parallax.controller) {
            initScrollMagic();
          }
        }

        $(window).on('load', function () {
          if (Modernizr.mq('(max-width: 992px)')) {
            if (Drupal.behaviors.parallax.controller) {
              destroyScrollMagic();
            }
            return;
          }

          else {
            if (!Drupal.behaviors.parallax.controller) {
              initScrollMagic();
            }
          }
        });
      }
    }
  };
})(Drupal, jQuery);
