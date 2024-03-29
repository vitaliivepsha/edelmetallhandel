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
    require('./assets/templates/layouts/product-luxusuhren.html');
    require('./assets/templates/layouts/product-muenzen.html');
    require('./assets/templates/layouts/product-schmuck.html');
    require('./assets/templates/layouts/shipping.html');
    require('./assets/templates/layouts/investment.html');
    require('./assets/templates/layouts/new-schmuck.html');
    require('./assets/templates/layouts/new-munzen.html');
    require('./assets/templates/layouts/new-uhren.html');
    require('./assets/templates/layouts/product-stamps.html');
    require('./assets/templates/layouts/blog.html');
    require('_templates/layouts/article.html');
    require('_templates/layouts/author.html');
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
require('_modules/succinct/succinct');

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

    // scroll to id

    $(document).on("click", 'a[href*="#"]', function (e) {
        var id = $(this).attr("href");
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        var pos = $id.offset().top;
        $("body, html").animate({ scrollTop: pos }, 500);
    });
    $(document).on("click", 'a[href*="#"]', function (e) {
        e.preventDefault();
    });

    // fixed header

    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 200 && scrolled > scrollPrev) {
            header.addClass('top');
            $('body').addClass('hidden-header');
        }
        else {
            header.removeClass('top');
            $('body').removeClass('hidden-header');
        };
        if (scrolled > 200) {
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
            $("#upload-preview").prepend('<div class="file"><span>' + files[i].name + '</span></div>');
        }
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

    // main form
    $('.first-step__form input.required').each(function() {
        var input = $(this);
        var data_error = $(this).data('validate-required');
        var input_wrapper = $(this).parent();
        /*$('.first-step__form .btn').click(function() {
            if(!input.val()) {
                $(this).parent().addClass('err');
            }
        });*/
        $('.first-step__form').on('submit', function(e){
            var name_data_val = $(this).find('input[name="name"]').val();
            var tel_data_val = $(this).find('input[name="telefon"]').val();
            console.log(tel_data_val);
            e.preventDefault();
            if ($.trim(input.val()) === '') {
                input_wrapper.addClass('err').append('<div class="validate-error"><div class=""><div><i></i>' + data_error + '</div></div></div>');
            }
            else if($('.input-wrapper.err').length){
                return false;
            }
            else {
                $.ajax({
                    success: function () {
                        $('.main-form__step.step1').hide();
                        $('.main-form__step.step2').show();
                    }
                });
                $('.second-step__form').find('input[name="name"]').val(name_data_val).parent().addClass('filled');
                $('.second-step__form').find('input[name="telefon"]').val(tel_data_val).parent().addClass('filled');
            }
        });
    });
    $('.first-step__form input.required').click(function() {
        $(this).parent().removeClass('err').find('.validate-error').remove();
    });
    $('.first-step__form input.required').keyup(function() {
        if ($(this).val() == '') {
            $(this).parent().removeClass('filled');
        }
        else{
            $(this).parent().addClass('filled');
        }
    });

    // comeback popup

    $('#comeback-trigger').mouseover(function() {
        if ($(window).width() > 480) {
            //if (typeof $.cookie('exit') === 'undefined') {
                $.magnificPopup.open(
                    {
                        items: {
                            src: '#comeback'
                        },
                        type: 'inline'
                    },
                    0
                );
                $.cookie('exit', 1, { expires: 1 });
            //}
        }
    });

    // truncate text

    $('.blog-item__text').succinct({
        size: 115
    });
});
