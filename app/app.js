// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/contacts.html');
    require('./assets/templates/layouts/about.html');
    require('./assets/templates/layouts/404.html');
    require('./assets/templates/layouts/404-search.html');
    require('./assets/templates/layouts/404-search-nf.html');
    require('./assets/templates/layouts/impresum.html');
    require('./assets/templates/layouts/privacy.html');
    require('./assets/templates/layouts/product-diamonds.html');
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
$(function () {
    new Forms();
    new Popup();
    new LightGallery();
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
    }, 100);

    // fixed header

    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 0) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
        scrollPrev = scrolled;
    });

    // input filled

    $('.input, .textarea').on('input', function () {
        var $wrap = $(this).closest('.input-wrapper');
        if ($(this).val().length) {
            $wrap.addClass('filled');
        } else {
            $wrap.removeClass('filled');
        }
    });

    // checkbox change

    $('.checkbox-wrapper input').on('change', function () {
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

    // upload file



    $(document).delegate("#upload-files", "change", function () {
        var files = $("#upload-files")[0].files;
        for (var i = 0; i < files.length; i++) {
            $("#upload-preview").prepend(
                '<div class="file"><span>' +
                files[i].name +
                "</span>\n" +
                '                  <i class="delete-file">\n' +
                '                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '                      <path d="M5.99945 7.19342C4.57713 8.6194 3.21463 9.98556 1.85091 11.3529C1.7215 11.4824 1.59819 11.6191 1.46023 11.7387C1.06711 12.0794 0.582422 12.0842 0.252786 11.7571C-0.0780719 11.4299 -0.0915015 10.9317 0.261332 10.552C0.68986 10.0906 1.14769 9.65593 1.59331 9.20908C2.64204 8.16035 3.692 7.11162 4.78956 6.01527C4.6223 5.83824 4.47824 5.67953 4.32807 5.52814C3.03516 4.23279 1.73981 2.93866 0.446905 1.64209C-0.0622005 1.13176 -0.133011 0.648296 0.234473 0.261278C0.617828 -0.144053 1.12327 -0.0769047 1.65924 0.456619C2.95581 1.74953 4.24872 3.04488 5.54285 4.33901C5.68447 4.48063 5.83341 4.61615 6.0141 4.78951C7.35707 3.4441 8.67806 2.12189 9.99782 0.798464C10.1553 0.63975 10.3091 0.477373 10.474 0.324764C10.9135 -0.0842299 11.4226 -0.106206 11.7693 0.26372C12.099 0.615333 12.0782 1.10735 11.679 1.5139C10.7242 2.48572 9.75975 3.44899 8.79038 4.40738C8.27028 4.92014 7.73188 5.4146 7.10313 6.01039C7.69647 6.56467 8.22511 7.03592 8.72933 7.53282C9.70115 8.48877 10.662 9.45448 11.6204 10.4239C12.0819 10.8902 12.1209 11.3969 11.7461 11.7619C11.3738 12.1245 10.8781 12.0757 10.408 11.6069C8.95275 10.1565 7.50601 8.7012 5.99945 7.19342Z"\n' +
                '                          fill="#FE9192" />\n' +
                "                    </svg>\n" +
                "                  </i>\n" +
                "                </div>"
            );
        }
    });

    $(document).delegate(".delete-file", "click", function () {
        $(this).closest(".file").remove();
        $(this).remove();
    });

















    // mobile menu

    var touch = $('.mobile-menu__btn');

    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });

    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });

    $(window).resize(function () {
        if ($(window).width() > 991) {
            $('.mobile-menu__btn').removeClass('active');
            $('body').removeClass('menu-opened');
        }
    });

    $('.mobile-menu .has-children > span').on('click', function () {
        $(this).toggleClass('opened').closest('li').find('.submenu').slideToggle();
    });

    // filters

    $('.btn-filters').on('click', function () {
        var btn_txt = $(this).find('span');
        btn_txt.html() == 'Скрыть фильтры' ? btn_txt.html('Отобразить фильтры') : btn_txt.html('Скрыть фильтры');
        $('.categories-main').toggleClass('opened-filters');
    });

    $(window).resize(function () {
        var btn_txt = $('.btn-filters').find('span');
        if ($(window).width() < 991) {
            btn_txt.html('Отобразить фильтры');
            $('.categories-main').removeClass('opened-filters');
        }
    });

    $('.btn-filters__mob').on('click', function () {
        $('body').toggleClass('filters-opened');
    });

    $('.mobile-filters__close').click(function () {
        $('body').removeClass('filters-opened');
    });

    $(document).click(function () {
        $('body').removeClass('filters-opened');
    });

    $(document).on('click', '.mobile-filters__wrapper', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.btn-filters__mob', function (e) {
        e.stopPropagation();
    });

    $('.categories-filter__head').on('click', function () {
        $(this).toggleClass('active').next().slideToggle();
    });

    $(window).resize(function () {
        if ($(window).width() > 991) {
            $('body').removeClass('filters-opened');
        }
    });

    // tabs

    $('.tabs').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
    });

    // btn go top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            $("#gotop").fadeIn();
        } else {
            $("#gotop").fadeOut();
        }
    });
    $("#gotop").click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
    });

    // map

    $('.city').mousedown(function (e) {
        e.stopPropagation();
        var map = $('.map-wrapper'),
            dot = $(this).find('circle'),
            left = dot.offset().left - map.offset().left,
            top = dot.offset().top - map.offset().top;
        $(this).addClass('active').siblings().removeClass('active')
            .closest('.map-wrapper').find('.title').removeClass('active').eq($(this).index()).addClass('active')
            .closest('.distributors-wrapper').find('.distributors-info').removeClass('active').eq($(this).index()).addClass('active');
        $('.map-wrapper .title.active').each(function () {
            var title_pos = $(this).width() + 28;
            $(this).css({'left': left + 3 - title_pos / 2, 'top': top - 25});
        });
    });

    $('.map-cities__list').on('click', 'li', function (e) {
        var city_name = $(this).html();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.map-cities__wrapper').find('.map-cities__title').html(city_name);
    });

    $('.distributors-info__head').on('click', function () {
        $(this).toggleClass('opened').next('.distributors-info__body').slideToggle();
    });

    $(window).resize(function () {
        if ($(window).width() > 574) {
            $('.distributors-info__head').removeClass('opened');
            $('.distributors-info__body').removeAttr('style');
        }
    });

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);

    // zoom product

    $(window).resize(function () {
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
        } else {
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
