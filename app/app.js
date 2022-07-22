// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
  require('./assets/templates/layouts/contacts.html');
  require('./assets/templates/layouts/about.html');
  require('./assets/templates/layouts/404.html');
  require('./assets/templates/layouts/404-search.html');
  require('./assets/templates/layouts/404-search-nf.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
var LightGallery = require('_modules/lightgallery');
var Slider = require('_modules/slider');
require('../node_modules/sumoselect/jquery.sumoselect.min');
//require('../node_modules/ez-plus/src/jquery.ez-plus');
require('../node_modules/sweetalert2/dist/sweetalert2');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
  new LightGallery();
  new Slider();

  setTimeout(function() {
    $('body').trigger('scroll');
    $(window).trigger('resize');
  }, 100);

    // fixed header

  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();

    if (scrolled > 0) {
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
    }
    scrollPrev = scrolled;
  });

  // input filled

    $('.input, .textarea').on('input', function() {
        var $wrap = $(this).closest('.input-wrapper');
        if ($(this).val().length) {
            $wrap.addClass('filled');
        }
        else{
            $wrap.removeClass('filled');
        }
    });

    // checkbox change

    $('.checkbox-wrapper input').on('change', function() {
        var btn = $(this).closest('form').find('button[type=submit]');
        if (this.checked) {
            btn.prop('disabled', false);
        } else {
            btn.prop('disabled', true);
        }
    });

    // select

  $('.select').SumoSelect({
    forceCustomRendering: true
  });

    $('.select').change(function () {
        var value = $(this).val();
        $(this).closest('.select-wrapper').removeClass('err').addClass('chosen').find('input').val(value);
        $(this).closest('.select-wrapper').find('.validate-error').remove();
    });

    // mobile menu

  var touch = $('.mobile-menu__btn');

  var toggles = document.querySelectorAll('.mobile-menu__btn');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }

  function toggleHandler(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
    });
  }

  $(touch).click(function(e) {
    e.preventDefault();
    $('body').toggleClass('menu-opened');
    return false;
  });

  $(document).on('click', '.mobile-menu__btn', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.mobile-menu__wrapper', function(e) {
    e.stopPropagation();
  });

  $(window).resize(function() {
    if ($(window).width() > 991) {
      $('.mobile-menu__btn').removeClass('active');
      $('body').removeClass('menu-opened');
    }
  });

  $('.mobile-menu .has-children > span').on('click', function() {
    $(this).toggleClass('opened').closest('li').find('.submenu').slideToggle();
  });

    // filters

  $('.btn-filters').on('click', function() {
    var btn_txt = $(this).find('span');
    btn_txt.html() == 'Скрыть фильтры' ? btn_txt.html('Отобразить фильтры') : btn_txt.html('Скрыть фильтры');
    $('.categories-main').toggleClass('opened-filters');
  });

  $(window).resize(function() {
    var btn_txt = $('.btn-filters').find('span');
    if ($(window).width() < 991) {
      btn_txt.html('Отобразить фильтры');
      $('.categories-main').removeClass('opened-filters');
    }
  });

  $('.btn-filters__mob').on('click', function() {
    $('body').toggleClass('filters-opened');
  });

  $('.mobile-filters__close').click(function() {
    $('body').removeClass('filters-opened');
  });

  $(document).click(function() {
    $('body').removeClass('filters-opened');
  });

  $(document).on('click', '.mobile-filters__wrapper', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.btn-filters__mob', function(e) {
    e.stopPropagation();
  });

  $('.categories-filter__head').on('click', function() {
    $(this).toggleClass('active').next().slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() > 991) {
      $('body').removeClass('filters-opened');
    }
  });

    // tabs

  $('.tabs').on('click', 'li:not(.active)', function() {
    $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
  });

    // map

  $('.city').mousedown(function(e) {
    e.stopPropagation();
    var map = $('.map-wrapper'),
      dot = $(this).find('circle'),
      left = dot.offset().left - map.offset().left,
      top = dot.offset().top - map.offset().top;
    $(this).addClass('active').siblings().removeClass('active')
            .closest('.map-wrapper').find('.title').removeClass('active').eq($(this).index()).addClass('active')
            .closest('.distributors-wrapper').find('.distributors-info').removeClass('active').eq($(this).index()).addClass('active');
    $('.map-wrapper .title.active').each(function() {
      var title_pos = $(this).width() + 28;
      $(this).css({ 'left': left + 3 - title_pos / 2, 'top': top - 25 });
    });
  });

  $('.map-cities__list').on('click', 'li', function(e) {
    var city_name = $(this).html();
    $(this).addClass('active').siblings().removeClass('active');
    $(this).closest('.map-cities__wrapper').find('.map-cities__title').html(city_name);
  });

  $('.distributors-info__head').on('click', function() {
    $(this).toggleClass('opened').next('.distributors-info__body').slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() > 574) {
      $('.distributors-info__head').removeClass('opened');
      $('.distributors-info__body').removeAttr('style');
    }
  });

    // lazy load
  var lazyload = function() {
    var scroll = $(window).scrollTop() + $(window).height() * 3;

    $('.lazy').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('src', $(this).data('original'));
      }
    });
    $('.lazy-web').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('srcset', $(this).data('original'));
      }
    });
  };
  $(window).scroll(lazyload);

    // zoom product

  $(window).resize(function() {
    if ($(window).width() > 991) {
      $('.zoom-pic').ezPlus({
        borderSize: 0,
        easing: false,
        zoomWindowFadeIn: 300,
        zoomWindowFadeOut: 300,
        lensFadeIn: 300,
        lensFadeOut: 300,
        zoomWindowHeight: 500,
        zoomWindowWidth: 680
      });
    }
    else {
      $('.zoom-pic').ezPlus({
        zoomType: 'inner',
        cursor: 'crosshair',
        borderSize: 0,
        zoomWindowHeight: 600,
        zoomWindowFadeIn: 300,
        zoomWindowFadeOut: 300,
        lensFadeIn: 300,
        lensFadeOut: 300,
      });
    }
  });
});
